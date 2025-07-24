import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }, []);
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
