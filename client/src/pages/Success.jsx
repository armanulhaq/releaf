import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="h-[85vh] flex items-center justify-center">
            <div className="p-6 md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
                        Payment Successful
                    </h3>

                    <p className="text-gray-600/90">
                        Thank you for your purchase. We appreciate your support!
                    </p>
                    <div className="py-10 text-center">
                        <a
                            onClick={() => navigate("/my-orders")}
                            href="#"
                            className="px-12 bg-[#432507] hover:bg-[#432507]/90 text-white font-semibold py-3 rounded-sm"
                        >
                            Go to my orders
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
