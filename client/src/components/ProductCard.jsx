import React from "react";

const ProductCard = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-col border-1 border-gray-200 p-6 rounded-xl gap-1 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                    <img
                        src={product.images[0]}
                        alt=""
                        className="rounded-md w-full mb-1"
                    />
                    <div className="text-lg font-bold line-clamp-1">
                        {product.name}
                    </div>
                    <div className="text-xs line-height-3 text-gray-400 mb-2 line-clamp-3">
                        {product.shortDescription}
                    </div>
                    <div className="text-lg font-bold mb-2 ">
                        ₹ {product.discountPrice}
                    </div>
                    <div className="flex justify-between">
                        <button className="border-1 border-[#432507] text-[#432507] px-5 py-2 rounded-md hover:bg-[#432507] hover:text-white transition-all duration-300 cursor-pointer">
                            Add to Cart
                        </button>
                        <button className="bg-[#432507] text-white px-5 py-2 rounded-md cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCard;
