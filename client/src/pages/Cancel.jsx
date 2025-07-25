import { useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate();
    return (
        <div className="h-[85vh] flex items-center justify-center">
            <div className="p-6 md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12 0a12 12 0 1 0 12 12A12.014 12.014 0 0 0 12 0Zm5.657 16.243a1 1 0 0 1-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 0 1-1.414-1.414L10.586 12 6.343 7.757a1 1 0 1 1 1.414-1.414L12 10.586l4.243-4.243a1 1 0 1 1 1.414 1.414L13.414 12Z"
                    />
                </svg>

                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Cancelled
                    </h3>
                    <p className="text-gray-600/90">
                        If this was a mistake, you can return to the store and
                        try again.
                    </p>
                    <div className="py-10 text-center">
                        <a
                            onClick={() => navigate("/")}
                            href="#"
                            className="px-12 bg-[#432507] hover:bg-[#432507]/90 text-white font-semibold py-3 rounded-sm"
                        >
                            Return to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
