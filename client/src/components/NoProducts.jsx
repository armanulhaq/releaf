import { ShoppingBag } from "lucide-react";

const NoProducts = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
            <ShoppingBag className="md:w-48 md:h-48 w-24 h-24 object-contain mb-6 text-[#432507]" />
            <h2 className="text-2xl font-semibold text-[#432507] mb-2">
                Oops, nothing here yet!
            </h2>
            <p className="text-[#432507] max-w-md">
                Looks like our shelf is empty. Check back soon.
            </p>
        </div>
    );
};

export default NoProducts;
