import ecoFriendly from "../assets/image.png";

const Benefits = () => {
    return (
        <div className="w-full my-10 bg-[#f0ead2] p-10 rounded-lg">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="w-full">
                    <img
                        src={ecoFriendly}
                        alt="Sustainable lifestyle products"
                        className="h-auto w-full rounded-md"
                    />
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold">
                        Your <span className="text-primary">Impact</span>
                    </h1>

                    <h2 className="text-xl font-semibold ">
                        Make a Difference with Every Purchase
                    </h2>

                    <p className="text-md leading-relaxed">
                        When you choose our sustainable products, you're not
                        just buying quality items—you're actively contributing
                        to a healthier planet. Every purchase reduces waste,
                        supports ethical manufacturing, and helps build a
                        sustainable future.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#432507] rounded-full"></div>
                            <span className="text-md">
                                Reduce plastic waste by up to 80%
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#432507] rounded-full"></div>
                            <span className="text-md ">
                                Support carbon-neutral shipping
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#432507] rounded-full"></div>
                            <span className="text-md">
                                Choose 100% biodegradable materials
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;
