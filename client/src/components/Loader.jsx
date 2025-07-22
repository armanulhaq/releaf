const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-[#432507] border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#432507] text-xl font-bold">♻️</span>
                </div>
            </div>
            <p className="text-[#4d382d] font-medium">
                Nurturing nature... Just a moment 🌱
            </p>
        </div>
    );
};

export default Loader;
