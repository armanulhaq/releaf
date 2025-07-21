import React from "react";
import logo from "../assets/icon.png";
import userIcon from "../assets/user.png";

const Navbar = () => {
    return (
        <div className="my-3 md:my-6  flex justify-between">
            <div className="flex cursor-pointer">
                <div className="text-2xl font-bold text-[#432507]">ReLeaf</div>
                <img src={logo} alt="ReLeaf logo" className="w-8 h-8" />
            </div>
            <div className="flex gap-5">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-40 md:w-64 border-gray-500 text-gray-400 border-[0.8px] text-sm rounded-lg px-4 outline-none"
                />
                <img
                    src={userIcon}
                    alt="User icon"
                    className="w-8 h-8 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Navbar;
