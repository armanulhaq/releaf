import { useEffect, useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stripeLoading, setStripeLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("http://localhost:3000/cart/", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch cart");
                }
                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, []);
    console.log(cart);

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
            const res = await fetch(
                "http://localhost:3000/payment/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        product: cart,

                        currency: "INR",
                        success_url: "http://localhost:5173/success",
                        cancel_url: "http://localhost:5173/cancel",

                        quantity: cart.quantity,
                    }),
                }
            );
            const data = await res.json();
            if (data.session && data.session.url) {
                const stripe = await stripePromise;

                await stripe.redirectToCheckout({
                    sessionId: data.session.id,
                });
            } else {
                console.log("Failed to create checkout session");
            }
        } catch (error) {
            console.log(error, "Error creating checkout session", error);
        } finally {
            setStripeLoading(false);
        }
    };

    if (isLoading) return <Loader />;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-20">
                        <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added anything to your cart
                            yet.
                        </p>
                        <button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:px-32  lg:py-16 py-8">
            <div className="">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                        Shopping Cart
                    </h1>
                    <p className="lg:text-lg text-sm">
                        {cart.length} {cart.length === 1 ? "item" : "items"} in
                        your cart
                    </p>
                </div>

                <div className="grid xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
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
                                                    <div className="text-xs bg-amber-950/60 text-white px-2 py-1 rounded-full  ">
                                                        {item.product.category}
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
                                                    <div className="text-xs text-[#432507]">
                                                        You save ₹
                                                        {item.product
                                                            .originalPrice -
                                                            item.product
                                                                .discountPrice}{" "}
                                                        per item
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1 ">
                        <div className=" border-1 border-gray-200 rounded-xl bg-amber-50">
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
                                        className="w-full bg-[#432507] text-white py-3 cursor-pointer flex justify-center items-center"
                                    >
                                        {stripeLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            "Proceed to Checkout"
                                        )}
                                    </button>
                                    <button
                                        onClick={() => navigate("/")}
                                        className="w-full cursor-pointer"
                                    >
                                        Continue Shopping
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
