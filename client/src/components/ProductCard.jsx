import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const discountCalculator = (originalPrice, discountPrice) => {
        const discount = originalPrice - discountPrice;
        const discountPercentage = (discount / originalPrice) * 100;
        return discountPercentage.toFixed(0);
    };

    return (
        <>
            <div
                key={product.id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex flex-col justify-between shadow-sm p-6 rounded-xl gap-1 cursor-pointer"
            >
                <img
                    src={product.images[0]}
                    alt=""
                    className="rounded-md w-full mb-1 aspect-square"
                />

                <div className="text-lg font-bold line-clamp-1">
                    {product.name}
                </div>
                <div className="text-xs line-height-3 text-gray-500/90 mb-2 line-clamp-3">
                    {product.shortDescription}
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-lg flex items-center gap-2 font-bold">
                        ₹ {product.discountPrice}
                        <span className="text-sm line-clamp-1 text-gray-500/90 line-through">
                            ₹ {product.originalPrice}
                        </span>
                    </div>
                    <div className="text-xs flex items-center gap-2 line-clamp-1 text-[#432507]">
                        {discountCalculator(
                            product.originalPrice,
                            product.discountPrice
                        )}
                        % off
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
