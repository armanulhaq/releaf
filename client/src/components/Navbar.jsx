import { LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("http://localhost:3000/auth/me", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null); // reset on 401
            }
        };
        fetchUser();
    }, [location]);
    const handleLogout = async () => {
        const res = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            setUser(null);
            navigate(0); //full page reload
        }
    };
    return (
        <div className="top-0 z-50 py-6 flex justify-between px-7 md:px-12 lg:px-24">
            <div className="flex cursor-pointer">
                <div className="text-2xl font-bold">ReLeaf</div>
            </div>
            <div className="flex gap-10">
                {user && (
                    <ShoppingCart className="w-6 h-6 cursor-pointer text-[#432507]" />
                )}
                {user ? (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-6 h-6 text-[#432507]" />
                        <div className="text-sm">Logout</div>
                    </div>
                ) : (
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        <LogIn className="w-6 h-6 text-[#432507]" />
                        <div className="text-sm">Login</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
