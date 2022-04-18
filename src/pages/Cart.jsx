import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";
import SingleCartItem from "./SingleCartItem";
import fireDp from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.CartReducer);
  const [total, setTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(cartItems.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to count the total value
  useEffect(() => {
    let totalTemp = 0;
    cartItems.forEach((each) => {
      totalTemp += each.price * each.qty;
    });
    setTotal(totalTemp);
    setNumberOfItems(cartItems.length);
  }, [cartItems]);
  // to update the local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  async function addToOrder() {
    let currentUser = localStorage.getItem("userEmail");
    const docRef = await addDoc(collection(fireDp, "orders"), {
      items: cartItems,
      userName: currentUser,
    });
    dispatch({ type: "EMPTY_THE_CART" });
    navigate("/orderSuccess");
  }

  console.log(numberOfItems);
  if (numberOfItems > 0) {
    return (
      <Layout>
        <div className="container pt-5">
          <table className="table ">
            <thead>
              <tr>
                <th className="col-md-3">Image</th>
                <th className="col-md-3">Name</th>
                <th className="col-md-3">Quantity</th>
                <th className="col-md-3">Price</th>
                <th className="col-md-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return <SingleCartItem key={item.id} product={item} />;
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => {
                addToOrder();
              }}
              type="button"
              className="btn btn-success"
            >
              Place Order
            </button>
            <h1>
              Total <span> </span> $ {total}
            </h1>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="container pt-5 emptyCart">
          <h1>Cart is Empty</h1>
        </div>
      </Layout>
    );
  }
}
