import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);

    const handlePrev = () => {
        setDirection(-1);
        setCount((prev) => (prev - 1 + products.length) % products.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCount((prev) => (prev + 1) % products.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    return (
        <div className="w-full relative">
            <div className="flex md:flex-row flex-col gap-5 md:gap-0 cursor-pointer my-6 md:my-15 items-center">
                <div className="md:w-2/3 overflow-hidden relative h-170">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.img
                            key={products[count]?.images?.[0]}
                            src={products[count]?.images?.[0]}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
                <div className="md:w-1/3 flex flex-col gap-5 md:pl-10 justify-center">
                    <motion.div
                        key={products[count]?.name}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-xl md:text-2xl lg:text-4xl font-extrabold">
                            {products[count]?.name}
                        </div>
                        <div className="text-sm md:text-md lg:text-lg mt-2">
                            {products[count]?.shortDescription}
                        </div>
                        <button className="bg-[#432507] mt-4 text-white w-fit px-5 py-2 rounded-sm cursor-pointer">
                            Buy Now
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="flex ">
                <ChevronLeft
                    className="w-10 h-10 absolute top-1/2 left-1 z-10 cursor-pointer opacity-15 hover:opacity-100 transition-all duration-300"
                    onClick={handlePrev}
                />
                <ChevronRight
                    className="w-10 h-10 absolute top-1/2 right-1 z-10 cursor-pointer opacity-15 hover:opacity-100 transition-all duration-300"
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default Homepage;
