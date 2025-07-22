import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Check, ShoppingCart } from "lucide-react";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";

const Product = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`http://localhost:3000/products/${id}`);
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                const data = await res.json();
                setCurrentProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${
                    i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-yellow-100 text-yellow-200"
                }`}
            />
        ));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!currentProduct) {
        return <NoProducts />;
    }

    return (
        <div className="px-4 py-8 lg:py-16 max-h-[80vh]">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16">
                <div className="space-y-4">
                    <div className="rounded-lg lg:rounded-3xl overflow-hidden transition-all duration-300">
                        <img
                            src={currentProduct.images[0]}
                            alt={currentProduct.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                <div className="space-y-4 xl:px-16">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
                            {currentProduct.name}
                        </h1>

                        <p className="text-sm md:text-md mb-2">
                            {currentProduct.shortDescription}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {renderStars(currentProduct.rating)}
                        </div>
                        <span className="text-sm">
                            {currentProduct.rating} out of 5 stars
                        </span>
                    </div>

                    <div className="text-sm md:text-md my-4 text-gray-500/90">
                        {currentProduct.longDescription}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">
                            Key Features
                        </h3>
                        <div className="space-y-1 ">
                            {currentProduct.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <Check className="w-5 h-5 text-[#432507] mt-0.5" />
                                    <span className="text-sm text-gray-500/90">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 ">
                        <span className="text-4xl font-bold">
                            ₹ {currentProduct.discountPrice}
                        </span>

                        <span className="text-xl line-through">
                            ₹ {currentProduct.originalPrice}
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex  gap-2 px-2 py-1 lg:py-2 cursor-pointer bg-gray-200 w-[40%] justify-between items-center rounded-sm">
                            <div className="md:w-8 md:h-8 w-3 h-3 flex items-center justify-center">
                                -
                            </div>
                            <div className="md:w-8 md:h-8 w-6 h-6 flex items-center justify-center">
                                0
                            </div>
                            <div className="md:w-8 md:h-8 w-3 h-3 flex items-center justify-center">
                                +
                            </div>
                        </button>
                        <button
                            disabled={!currentProduct.inStock}
                            className="flex items-center gap-2 px-5 py-3 cursor-pointer bg-[#432507] text-white w-[60%] justify-center rounded-sm"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </button>
                    </div>

                    <div className="my-4 space-y-4 pt-6 rounded-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Material</p>
                                <p className="text-sm ">
                                    {currentProduct.material}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Color</p>
                                <p className="text-sm ">
                                    {currentProduct.color}
                                </p>
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                                <p className="text-sm font-bold">
                                    Care Instructions
                                </p>
                                <p className="text-sm">
                                    {currentProduct.careInstructions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Product;
