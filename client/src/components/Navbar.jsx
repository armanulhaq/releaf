import { LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
                {
                    credentials: "include",
                }
            );
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null); // reset on 401
            }
        };
        fetchUser();
    }, [location]); // fetch user info when URL changes

    const handleLogout = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );
        if (res.ok) {
            setUser(null);
            navigate(0);
        }
    };

    return (
        <div className="lg:py-6 py-4 flex justify-between px-7 md:px-12 lg:px-24">
            <div className="flex cursor-pointer">
                <div
                    className="text-2xl font-bold cursor-pointer flex items-center gap-2"
                    onClick={() => navigate("/")}
                >
                    ReLeaf
                </div>
            </div>
            <div className="flex justify-center items-center lg:gap-10 gap-5">
                {user && (
                    <div className="flex items-center gap-8">
                        <div
                            className="cursor-pointer text-[#432507] text-sm lg:text-md"
                            onClick={() => navigate("/my-orders")}
                        >
                            My Orders
                        </div>
                        <ShoppingCart
                            onClick={() => navigate("/cart")}
                            className="lg:w-6 lg:h-6 w-5 h-5 cursor-pointer text-[#432507]"
                        />
                    </div>
                )}
                {user ? (
                    <div
                        className="flex lg:gap-2 gap-1 border-1 px-3 py-2 rounded-md items-center cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut className="lg:w-6 lg:h-6 w-5 h-5" />
                        <div className="lg:flex hidden text-sm">Logout</div>
                    </div>
                ) : (
                    <div
                        className="flex gap-2 bg-[#432507] text-white px-5 py-2 rounded-md items-center cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        <LogIn className="lg:w-6 lg:h-6 w-5 h-5" />
                        <div className="text-sm">Login</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
