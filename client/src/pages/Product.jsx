import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Check, ShoppingCart } from "lucide-react";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";

const Product = () => {
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    const discountCalculator = (originalPrice, discountPrice) => {
        const discount = originalPrice - discountPrice;
        const discountPercentage = (discount / originalPrice) * 100;
        return discountPercentage.toFixed(0);
    };

    useEffect(() => {
        const fetchProductAndQuantity = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (res.status === 401) {
                    navigate("/login");
                    return;
                }

                if (!res.ok) {
                    console.error(`Unexpected error: ${res.status}`);
                    throw new Error(
                        `Product fetch failed with status ${res.status}`
                    );
                }

                const productData = await res.json();
                setProductDetails(productData);

                const qtyRes = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/cart/${
                        productData._id
                    }`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const qtyData = await qtyRes.json();
                setQuantity(qtyData.quantity || 0);
            } catch (error) {
                console.error("Error loading product or quantity:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchProductAndQuantity();
    }, [id]);

    const updateCart = async (newQuantity) => {
        setQuantity(newQuantity);
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: productDetails._id,
                quantity: newQuantity,
            }),
        });
    };

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

    if (isLoading) return <Loader />;
    if (!productDetails) return <NoProducts />;

    return (
        <div className="px-4 py-8 lg:py-16 ">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16">
                <div className="space-y-4">
                    <div className="rounded-lg lg:rounded-3xl overflow-hidden">
                        <img
                            src={productDetails.images[0]}
                            alt={productDetails.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="flex flex-col justify-center space-y-4 xl:px-16">
                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
                            {productDetails.name}
                        </h1>
                        <p className="text-sm md:text-md mb-2">
                            {productDetails.shortDescription}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {renderStars(productDetails.rating)}
                        </div>
                        <span className="text-sm">
                            {productDetails.rating} out of 5 stars
                        </span>
                    </div>

                    <div className="text-sm md:text-md my-4 text-gray-500/90">
                        {productDetails.longDescription}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">
                            Key Features
                        </h3>
                        <div className="space-y-1">
                            {productDetails.features.map((feature, index) => (
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

                    {/* Price & Discount */}
                    <div className="flex gap-3 items-center">
                        <span className="text-4xl font-bold">
                            ₹ {productDetails.discountPrice}
                        </span>
                        <span className="text-xl text-gray-500/90 line-through">
                            ₹ {productDetails.originalPrice}
                        </span>
                        <span className="text-sm text-[#432507]">
                            {discountCalculator(
                                productDetails.originalPrice,
                                productDetails.discountPrice
                            )}{" "}
                            % off
                        </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex gap-3 items-center lg:w-[70%]">
                        <button className="flex gap-2 px-2 py-1 lg:py-2 bg-gray-200 w-[40%] justify-between items-center rounded-sm">
                            <div
                                onClick={() => {
                                    const newQuantity = Math.max(
                                        0,
                                        quantity - 1
                                    );
                                    updateCart(newQuantity);
                                }}
                                className="w-10 h-10 flex items-center justify-center cursor-pointer"
                            >
                                -
                            </div>
                            <div className="w-10 h-10 flex items-center justify-center">
                                {quantity}
                            </div>
                            <div
                                onClick={() => {
                                    const newQuantity = quantity + 1;
                                    updateCart(newQuantity);
                                }}
                                className="w-10 h-10 flex items-center justify-center cursor-pointer"
                            >
                                +
                            </div>
                        </button>

                        <button
                            disabled={!productDetails.inStock}
                            onClick={() => navigate("/cart")}
                            className="flex items-center gap-2 px-5 py-4 bg-[#432507] text-white w-[60%] justify-center rounded-sm cursor-pointer"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Go to Cart
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="my-4 space-y-4 pt-6 rounded-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Material</p>
                                <p className="text-sm">
                                    {productDetails.material}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Color</p>
                                <p className="text-sm">
                                    {productDetails.color}
                                </p>
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                                <p className="text-sm font-bold">
                                    Care Instructions
                                </p>
                                <p className="text-sm">
                                    {productDetails.careInstructions}
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
