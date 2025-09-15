import { useEffect, useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // loads the Stripe object in the browser using my public key.

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stripeLoading, setStripeLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserLoading(true);
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await res.json();
                // Extract the user object from the nested response
                const userData = data.user;
                setUser(userData);
            } catch (error) {
                console.error("Error details:", error.message);
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Fetch cart data
    useEffect(() => {
        const fetchCart = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/cart/`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch cart");
                }
                const data = await res.json();
                const filteredCart = data.filter(
                    (cartItem) => cartItem.quantity !== 0
                );
                setCart(filteredCart);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, []);
    const calculateSubtotal = () => {
        return cart.reduce(
            (total, item) => total + item.product.discountPrice * item.quantity,
            0
        );
    };

    const calculateOriginalTotal = () => {
        return cart.reduce(
            (total, item) => total + item.product.originalPrice * item.quantity,
            0
        );
    };

    const calculateSavings = () => {
        return calculateOriginalTotal() - calculateSubtotal();
    };

    const handlePayment = async () => {
        setStripeLoading(true);
        try {
            const payload = {
                product: cart, // send full cart
                currency: "INR", // payment currency
                success_url: `${window.location.origin}/success`, // redirect if success
                cancel_url: `${window.location.origin}/cancel`, // redirect if cancelled
                metadata: {
                    userId: String(user._id), // attach userId
                },
            };

            const res = await fetch(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/payment/create-checkout-session`,
                {
                    method: "POST", // create checkout session
                    headers: {
                        "Content-Type": "application/json", // JSON body
                    },
                    body: JSON.stringify(payload), // send payload to backend
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`); // handle server error
            }

            const data = await res.json(); // get response JSON

            if (data.session && data.session.id) {
                const stripe = await stripePromise; // load Stripe object
                await stripe.redirectToCheckout({
                    sessionId: data.session.id, // redirect user to Stripe checkout
                });
            } else {
                console.error("No session ID in response:", data);
                alert("Failed to create checkout session. Please try again.");
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("Payment initialization failed. Please try again.");
        } finally {
            setStripeLoading(false);
        }
    };

    // Show loader while either is loading
    if (isLoading || userLoading) {
        return <Loader />;
    }

    // Show error if user couldn't be loaded
    if (!userLoading && !user) {
        return (
            <div className="p-6 min-h-[85vh] flex items-center justify-center">
                <div className="mx-auto text-center py-20">
                    <h2 className="text-3xl font-bold mb-4">
                        Authentication Error
                    </h2>
                    <p className="mb-8">Please login to view your cart.</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-[#432507] px-6 hover:bg-[#432507]/90 text-white font-semibold py-3 rounded-sm cursor-pointer"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="p-6">
                <div className="min-h-[85vh] flex justify-center items-center">
                    <div className="text-center py-20">
                        <ShoppingBag className="w-24 h-24 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Your cart is empty
                        </h2>
                        <p className="mb-8">
                            Looks like you haven't added anything to your cart
                            yet.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#432507] px-6 hover:bg-[#432507]/90 text-white font-semibold py-3 rounded-sm cursor-pointer"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    // Check if user has _id before rendering payment button
    const canProceedToPayment = user && user._id && !userLoading;
    return (
        <div className="lg:px-32 lg:py-16 py-8">
            <div className="">
                <div className="mb-8 gap-2 flex flex-col">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                        Shopping Cart
                    </h1>
                    <p className="lg:text-md text-sm">
                        {cart.length}{" "}
                        {cart.length === 1 ? "product" : "products"} in your
                        cart
                    </p>
                </div>

                <div className="grid xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-4">
                        {cart
                            .filter((item) => item.quantity > 0)
                            .map((item) => (
                                <div
                                    key={item.product._id}
                                    className="border-1 border-gray-200 rounded-xl"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full md:w-32 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold line-clamp-1 flex justify-between">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-gray-500/80 text-sm line-clamp-2">
                                                        {
                                                            item.product
                                                                .shortDescription
                                                        }
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="text-xs bg-amber-950/60 text-white px-2 py-1 rounded-full">
                                                            {
                                                                item.product
                                                                    .category
                                                            }
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm font-medium">
                                                                {
                                                                    item.product
                                                                        .rating
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl font-bold">
                                                                ₹
                                                                {
                                                                    item.product
                                                                        .discountPrice
                                                                }
                                                            </span>
                                                            <span className="text-lg text-gray-500/90 line-through">
                                                                ₹
                                                                {
                                                                    item.product
                                                                        .originalPrice
                                                                }
                                                            </span>
                                                            <span className="text-sm bg-white px-2 py-1 rounded-full border border-gray-200">
                                                                x{item.quantity}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-green-600">
                                                            You are saving ₹
                                                            {(item.product
                                                                .originalPrice -
                                                                item.product
                                                                    .discountPrice) *
                                                                item.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="border-1 border-gray-200 rounded-xl bg-amber-50">
                            <div className="p-6 space-y-6">
                                <h2 className="text-2xl font-bold">
                                    Order Summary
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium">
                                            ₹{calculateOriginalTotal()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Savings</span>
                                        <span className="font-medium text-red-600">
                                            -₹{calculateSavings()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-medium text-green-500">
                                            Free
                                        </span>
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            ₹{calculateSubtotal()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handlePayment}
                                        disabled={
                                            !canProceedToPayment ||
                                            stripeLoading
                                        }
                                        className={`w-full rounded-md ${
                                            !canProceedToPayment ||
                                            stripeLoading
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        } bg-[#5433ff] text-white py-3 cursor-pointer flex justify-center items-center`}
                                    >
                                        {stripeLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : !canProceedToPayment ? (
                                            "Loading user data..."
                                        ) : (
                                            <div className="gap-2 flex items-center justify-center">
                                                <span>Checkout with</span>
                                                <img
                                                    src="/stripe.png"
                                                    alt="Stripe"
                                                    className="h-5"
                                                />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
