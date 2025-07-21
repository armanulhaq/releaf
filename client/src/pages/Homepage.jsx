import React from "react";
import { useState, useEffect } from "react";

const Homepage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);
    console.log(products);

    return (
        <div className="w-full">
            <div className="flex">
                <div className="w-1/2 bg-red-200">Left</div>
                <div className="w-1/2 bg-blue-200">Right</div>
            </div>
        </div>
    );
};

export default Homepage;
