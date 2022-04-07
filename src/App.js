import React from "react";
import "./App.css";
import "./stylesheet/layout.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductInfo from "./pages/ProductInfo";
import "./stylesheet/products.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productInfo/:productId" element={<ProductInfo />} />
          <Route path="register" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
