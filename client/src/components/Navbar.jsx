import { ShoppingCart } from "lucide-react";
import userIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="top-0 z-50 py-6 flex justify-between px-7 md:px-12 lg:px-24">
            <div className="flex cursor-pointer">
                <div
                    className="text-2xl font-bold"
                    onClick={() => navigate("/")}
                >
                    ReLeaf
                </div>
            </div>
            <div className="flex gap-10">
                <ShoppingCart className="w-6 h-6 cursor-pointer text-[#432507]" />
                <img
                    src={userIcon}
                    alt="User icon"
                    onClick={() => navigate("/login")}
                    className="w-6 h-6 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Navbar;
