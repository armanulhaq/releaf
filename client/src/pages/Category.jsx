import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Category = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        {
            async function fetchAllProducts() {
                const res = await fetch(
                    "https://releaf-backend.vercel.app/api/products"
                );
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
    if (filteredProducts.length === 0) {
        return <Loader />;
    }
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
