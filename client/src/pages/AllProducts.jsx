import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
            .then((res) => {
                if (!res.ok)
                    throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setAllProducts(data);
                setFetchError(null);
            })
            .catch((err) => {
                setFetchError(
                    "Could not connect to server. Please try again later.",
                    err
                );
                setAllProducts([]);
            });
    }, [fetchError]);
    if (!allProducts.length) return <Loader />;
    if (allProducts.length === 0) return <NoProducts />;
    return (
        <div className="">
            <div className="text-2xl font-bold mb-6">All Products</div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
                {allProducts.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default AllProducts;
