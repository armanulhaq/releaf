import { getUser } from "../middleware/auth.js";
import User from "../models/user.model.js";

// Add or update cart item
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
            myUser.cart.push({ product, quantity });
        }

        await myUser.save();
        res.status(200).json({ message: "Cart updated" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Failed to update cart" });
    }
}

// Get entire populated cart
async function getCart(req, res) {
    const user = getUser(req.cookies.token);

    try {
        const myUser = await User.findById(user._id).populate("cart.product");
        res.status(200).json(myUser.cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server error" });
    }
}
// Get quantity of specific product in user's cart
async function getCartById(req, res) {
    const user = getUser(req.cookies.token);
    const { id } = req.params;

    try {
        const myUser = await User.findById(user._id);
        const item = myUser.cart.find((item) => item.product.toString() === id);

        if (!item) {
            return res.status(200).json({ quantity: 0 });
        }

        res.status(200).json({ quantity: item.quantity });
    } catch (error) {
        console.error("Error fetching product quantity:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { updateCart, getCart, getCartById };
