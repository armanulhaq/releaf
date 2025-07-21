import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
            setCount((prev) => (prev - 1 + products.length) % products.length);
            setFade(true);
        }, 300); // This matches the CSS transition duration
    };

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setCount((prev) => (prev + 1) % products.length);
            setFade(true);
        }, 300);
    };

    return (
        <div className="w-full relative">
            <div className="flex md:flex-row flex-col gap-5 md:gap-0 cursor-pointer my-6 md:my-15 items-center">
                <div
                    className={`md:w-2/3 overflow-hidden relative h-170 transition-opacity duration-300 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={products[count]?.images?.[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div
                    className={`md:w-1/3 flex flex-col gap-5 md:pl-10 justify-center transition-opacity duration-300 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div>
                        <div className="text-xl md:text-2xl lg:text-4xl font-extrabold">
                            {products[count]?.name}
                        </div>
                        <div className="text-sm md:text-md lg:text-lg mt-2">
                            {products[count]?.shortDescription}
                        </div>
                        <button className="bg-[#432507] mt-4 text-white w-fit px-5 py-2 rounded-sm cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>

                <div className="flex">
                    <ChevronLeft
                        className="w-10 h-10 absolute top-90 left-0 z-10 cursor-pointer opacity-15 hover:opacity-100 transition-all duration-300"
                        onClick={handlePrev}
                    />
                    <ChevronRight
                        className="w-10 h-10 absolute top-90 right-0 z-10 cursor-pointer opacity-15 hover:opacity-100 transition-all duration-300"
                        onClick={handleNext}
                    />
                </div>
            </div>

            <div className="my-15">
                <div className="text-2xl font-bold my-6">Our Best Sellers</div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-15">
                    <ProductCard products={products} />
                </div>
                <div className="my-7 flex justify-center">
                    <button className="border-1 border-[#432507] text-[#432507] w-fit px-5 py-2 rounded-sm hover:bg-[#432507] hover:text-white transition-all duration-300 cursor-pointer">
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
