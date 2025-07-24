import { getUser } from "../middleware/auth.js";
import User from "../models/user.model.js";

async function updateCart(req, res) {
    const { product, quantity } = req.body;
    const user = getUser(req.cookies.token);
    try {
        const myUser = await User.findById(user._id);
        const existingItem = myUser.cart.find(
            (item) => item.product.toString() === product
        );
        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            myUser.cart.push({
                product: product,
                quantity: quantity,
            });
        }
        await myUser.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Failed to add product to cart" });
    }
}

async function getCart(req, res) {
    const user = getUser(req.cookies.token);
    const { id } = req.params;

    try {
        const myUser = await User.findById(user._id);
        const productInCart = myUser.cart.find(
            (item) => item.product.toString() === id
        );
        if (!productInCart) {
            return res.status(200).json({ quantity: 0 });
        }

        return res.status(200).json({ quantity: productInCart.quantity });
    } catch (error) {
        console.error("Error fetching cart product:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { updateCart, getCart };
