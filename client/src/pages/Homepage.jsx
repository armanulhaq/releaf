import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Benefits from "../components/Benefits";
import NoProducts from "../components/NoProducts";
import Categories from "../components/Categories";

const Homepage = ({ products, setProducts }) => {
    const [count, setCount] = useState(2); //i wanted the third product to be displayed first
    const [fade, setFade] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://releaf-backend.vercel.app/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
            setCount((prev) => (prev - 1 + products.length) % products.length);
            setFade(true);
        }, 200);
    };

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setCount((prev) => (prev + 1) % products.length);
            setFade(true);
        }, 200);
    };

    if (!products.length) return <Loader />;

    if (products.length === 0) return <NoProducts />;

    return (
        <div className="w-full relative">
            <div className="flex md:flex-row flex-col gap-5 md:gap-0 items-center  rounded-lg lg:p-8">
                <div
                    className={`md:w-2/3 overflow-hidden relative h-170 transition-opacity duration-300 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={products[count]?.images?.[0]}
                        alt={products[count]?.name || "Product image"}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div
                    className={`md:w-1/3 flex flex-col gap-5 md:pl-10 justify-center transition-opacity duration-300 ${
                        fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="">
                        <div className="text-xl md:text-2xl lg:text-4xl font-extrabold">
                            {products[count]?.name}
                        </div>
                        <div className="text-sm md:text-md lg:text-lg mt-2">
                            {products[count]?.shortDescription}
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <ChevronLeft
                        className="w-10 h-10 absolute top-90 left-0 z-10 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
                        onClick={handlePrev}
                    />
                    <ChevronRight
                        className="w-10 h-10 absolute top-90 right-0 z-10 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
                        onClick={handleNext}
                    />
                </div>
            </div>

            <div className="my-7">
                <div className="text-2xl font-bold mb-6">Our Best Sellers</div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10 lg:gap-15">
                    {products.slice(0, 8)?.map((product) => {
                        return (
                            <ProductCard key={product?._id} product={product} />
                        );
                    })}
                </div>
                <div className="my-7 flex justify-center">
                    <button
                        onClick={() => navigate("/all-products")}
                        className="border-1 border-[#432507] text-[#432507] w-fit px-5 py-2 rounded-sm hover:bg-[#432507] hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        View All
                    </button>
                </div>
            </div>
            <Categories />

            <Benefits />
        </div>
    );
};

export default Homepage;
