import React from "react";
import logo from "../assets/icon.png";
import userIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className=" md:mb-6 border-b-1 border-gray-100 py-5 flex justify-between">
            <div className="flex cursor-pointer">
                <div
                    className="text-2xl font-bold text-[#432507]"
                    onClick={() => navigate("/")}
                >
                    ReLeaf
                </div>
                <img src={logo} alt="ReLeaf logo" className="w-8 h-8" />
            </div>
            <div className="flex gap-5">
                <img
                    src={userIcon}
                    alt="User icon"
                    className="w-6 h-6 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Navbar;
