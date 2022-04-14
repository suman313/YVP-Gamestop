import React from "react";
import "./App.css";
import "./stylesheet/layout.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductInfo from "./pages/ProductInfo";
import "./stylesheet/products.css";
import AddProducts from "./pages/AddProducts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/productInfo/:productId"
            element={
              <ProtectedRoute>
                <ProductInfo />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Registration />} />
          <Route path="addProduct" element={<AddProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("userEmail")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
