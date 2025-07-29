import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Category = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/products`
                );
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setAllProducts(data);
                setFetchError(null);
            } catch (err) {
                setFetchError("Could not connect to server. Please try again later.");
                setAllProducts([]);
            }
        }
        fetchAllProducts();
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
