import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
    Package,
    Calendar,
    CreditCard,
    ShoppingBag,
    User,
    Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);

                const res = await fetch("http://localhost:3000/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

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
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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
                        <div className="rounded-lg border p-8 text-center">
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
            <div className="mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>{user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {user.orders.map((order, orderIndex) => (
                            <div
                                key={order._id}
                                className="rounded-lg border-1 border-gray-300 overflow-hidden bg-amber-50"
                            >
                                <div className="px-6 py-4 ">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
                                        <div className="flex items-center space-x-4 ">
                                            <div className="p-2 rounded-lg">
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    Order #{orderIndex + 1}
                                                </h3>
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {formatDate(
                                                            order.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold ">
                                                {formatPrice(order.totalAmount)}
                                            </div>
                                            <div className="flex items-center space-x-1 text-sm ">
                                                <CreditCard className="h-4 w-4" />
                                                <span>
                                                    Payment ID:{" "}
                                                    {order.paymentIntentId.slice(
                                                        -8
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Products List */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.products.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex items-center space-x-4 p-4 rounded-lg  border-b border-1 border-gray-300"
                                            >
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={
                                                            item.product
                                                                .images[0]
                                                        }
                                                        alt={item.product.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-medium truncate">
                                                        {item.product.name}
                                                    </h4>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <span className="text-sm">
                                                            Qty: {item.quantity}
                                                        </span>
                                                        <span className="text-sm font-medium">
                                                            {formatPrice(
                                                                item.product
                                                                    .discountPrice
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">
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
