import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Notfound from "../pages/Notfound";
import Catalog from "../pages/Catalog";
import Blogs from "../pages/Blogs";
import ProductDetail from "../pages/ProductDetail";
import ProductCategory from "../pages/ProductCategory";
import BlogsDetail from "../pages/BlogsDetail";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);
    
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Notfound />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogsDetail />} />
                <Route
                    path="/catalog/product/:id"
                    element={<ProductDetail />}
                />
                <Route
                    path="/catalog/:category"
                    element={<ProductCategory />}
                />
            </Routes>
        </Router>
    );
};

export default App;
