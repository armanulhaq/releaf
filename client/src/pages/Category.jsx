import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Category = () => {
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
    const { category } = useParams();
    const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    return (
        <>
            <div className="text-2xl font-bold my-6">{category}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-10 lg:gap-15 mb-10">
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
};

export default Category;
