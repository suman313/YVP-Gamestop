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
import AddProducts from "./pages/Admin/AddProducts";
import Admin from "./pages/Admin/Admin";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

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
          <Route
            path="/productInfo/:productId"
            element={
              <ProtectedRoute>
                <ProductInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderSuccess"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* Admin panel */}
          <Route
            path="/addProduct"
            element={
              <CheckForAdmin>
                <AddProducts />
              </CheckForAdmin>
            }
          />
          <Route
            path="/admin"
            element={
              <CheckForAdmin>
                <Admin />
              </CheckForAdmin>
            }
          />
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
export const CheckForAdmin = ({ children }) => {
  if (localStorage.getItem("userEmail") == "admin@gmail.com") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
