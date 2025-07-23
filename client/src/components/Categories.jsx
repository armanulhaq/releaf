import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Categories = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        {
            async function fetchAllProducts() {
                const res = await fetch("http://localhost:3000/products");
                const data = await res.json();
                setAllProducts(data);
            }
            fetchAllProducts();
        }
    }, []);
    if (!allProducts.length) return <Loader />;
    const categories = new Set();
    allProducts.forEach((product) => categories.add(product?.category));
    return (
        <>
            <div className="text-2xl font-bold mb-6">Shop By Category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from(categories).map((category) => (
                    <div
                        onClick={() => navigate(`/category/${category}`)}
                        key={category}
                        className="aspect-square bg-amber-50 flex items-center justify-center text-center p-4 border rounded-md cursor-pointer hover:bg-[#432507] hover:text-white transition-all duration-300"
                    >
                        {category}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Categories;
