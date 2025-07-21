import React from "react";

const ProductCard = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-col items-start p-6 rounded-xl shadow-sm gap-1"
                >
                    <img
                        src={product.images[0]}
                        alt=""
                        className="rounded-md w-full mb-1"
                    />
                    <div className="text-lg font-bold">{product.name}</div>
                    <div className="text-sm text-gray-500 mb-2 line-clamp-3">
                        {product.shortDescription}
                    </div>
                    <div className="text-lg font-bold mb-2 ">
                        ₹ {product.discountPrice}
                    </div>
                    <button className="bg-[#432507] text-white w-full px-5 py-2 rounded-md cursor-pointer">
                        Buy Now
                    </button>
                </div>
            ))}
        </>
    );
};

export default ProductCard;
