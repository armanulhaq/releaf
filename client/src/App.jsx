import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import AllProducts from "./pages/AllProducts";
import { useState } from "react";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import MyOrders from "./pages/MyOrders";

function App() {
    const [products, setProducts] = useState([]);

    return (
        <div>
            <Navbar />
            <div className="mx-7 md:mx-12 xl:mx-24">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Homepage
                                products={products}
                                setProducts={setProducts}
                            />
                        }
                    />
                    <Route
                        path="/all-products"
                        element={
                            <AllProducts
                                products={products}
                                setProducts={setProducts}
                            />
                        }
                    />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="category/:category"
                        element={<Category products={products} />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
