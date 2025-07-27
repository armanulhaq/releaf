import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Package, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(
                    "https://releaf-backend.vercel.app/api/auth/me",
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
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!user) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Package className="h-16 w-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">
                        Unable to load orders
                    </h2>
                    <p className="">Please try logging in again.</p>
                    <button
                        className="px-6 py-2 rounded-sm bg-[#432507] text-white hover:bg-[#432507]/90 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (!user.orders || user.orders.length === 0) {
        return (
            <div className="min-h-[85vh]">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="p-8 text-center">
                            <ShoppingBag className="h-16 w-16 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">
                                No orders yet
                            </h2>
                            <p className="">
                                When you place your first order, it will appear
                                here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh]">
            <div className="mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            My Orders
                        </h1>
                        <p className="text-sm text-gray-600 text-center md:text-left mt-1">
                            {user.orders.length} order
                            {user.orders.length !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    <div className="space-y-4">
                        {user.orders.map((order, orderIndex) => (
                            <div
                                key={order._id}
                                className="rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="px-4 py-3 border-b">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-4 w-4 text-gray-600" />
                                            <div>
                                                <h3 className="text-sm font-semibold">
                                                    Order #{orderIndex + 1}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    {formatDate(
                                                        order.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-green-600">
                                                {formatPrice(order.totalAmount)}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {order.products.length} item
                                                {order.products.length !== 1
                                                    ? "s"
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Products List */}
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {order.products.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center gap-3 p-3 rounded-lg border-1 border-gray-200"
                                            >
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm md:text-base font-medium truncate">
                                                        {item.product.name}
                                                    </h4>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="text-xs md:text-sm text-gray-600">
                                                            Qty: {item.quantity}
                                                        </span>
                                                        <span className="text-xs md:text-sm font-medium">
                                                            {formatPrice(
                                                                item.product
                                                                    .discountPrice
                                                            )}{" "}
                                                            each
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <div className="text-sm md:text-base font-semibold">
                                                        {formatPrice(
                                                            item.product
                                                                .discountPrice *
                                                                item.quantity
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
