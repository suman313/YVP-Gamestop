import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import SingleCartItem from "./SingleCartItem";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.CartReducer);
  const [total, setTotal] = useState(0);

  //to count the total value
  useEffect(() => {
    let totalTemp = 0;
    cartItems.forEach((each) => {
      totalTemp += each.price * each.qty;
    });
    setTotal(totalTemp);
  }, [cartItems]);
  // to update the local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // console.log(cartItems);
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
        <div className="d-flex justify-content-end">
          <h1>
            Total <span> </span> $ {total}
          </h1>
        </div>
      </div>
    </Layout>
  );
}
