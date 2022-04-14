import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
function Navbar() {
  const { cartItems } = useSelector((state) => state.CartReducer);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const onlyUser = userEmail.split("@")[0];
  const [itemQuantity, setItemQuantity] = useState(0);
  //counting the cart Items
  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.qty;
    });
    setItemQuantity(count);
  }, [cartItems]);

  function logout() {
    localStorage.removeItem("userEmail");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-10">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            YVP Gamestop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  {onlyUser}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() => {
                    logout();
                  }}
                  to="/login"
                >
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaCartPlus />
                  <span className="cart-counter">{itemQuantity}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
