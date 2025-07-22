import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import AllProducts from "./pages/AllProducts";
import { useState } from "react";
import Product from "./pages/Product";

function App() {
    const [products, setProducts] = useState([]);

    return (
        <div className="mx-7 md:mx-12 lg:mx-24">
            <Navbar />
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
            </Routes>
        </div>
    );
}

export default App;
