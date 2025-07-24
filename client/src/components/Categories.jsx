import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Categories = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);

    const categoryImages = [
        "https://images.unsplash.com/photo-1509201433847-56a1ced3a91f?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.pexels.com/photos/6634646/pexels-photo-6634646.jpeg",
        "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg",
        "https://images.pexels.com/photos/9157169/pexels-photo-9157169.jpeg", // Add more if needed
    ];

    useEffect(() => {
        async function fetchAllProducts() {
            const res = await fetch("http://localhost:3000/products");
            const data = await res.json();
            setAllProducts(data);
        }
        fetchAllProducts();
    }, []);

    if (!allProducts.length) return <Loader />;

    const categories = new Set();
    allProducts.forEach((product) => categories.add(product?.category));

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from(categories).map((category, idx) => {
                const bgImage = categoryImages[idx % categoryImages.length];
                return (
                    <div
                        key={category}
                        onClick={() => navigate(`/category/${category}`)}
                        className="cursor-pointer"
                    >
                        <div
                            className="relative aspect-square rounded-md overflow-hidden group"
                            style={{
                                backgroundImage: `url(${bgImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50 bg-opacity-60 group-hover:bg-[#432507]/80 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-extrabold text-2xl">
                                    {category} Care
                                </span>
                            </div>
                        </div>
                        <p className="text-center mt-2 text-lg font-medium">
                            {category}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;
