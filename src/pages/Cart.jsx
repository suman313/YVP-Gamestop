import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.CartReducer);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalTemp = 0;
    cartItems.forEach((each) => {
      totalTemp += each.price;
    });
    setTotal(totalTemp);
  }, [cartItems]);
  const dispatch = useDispatch();
  function deleteCart(product) {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  }
  return (
    <Layout>
      <div className="container pt-5">
        <table className="table ">
          <thead>
            <tr>
              <th className="col-md-3">Image</th>
              <th className="col-md-3">Name</th>
              <th className="col-md-3">Price</th>
              <th className="col-md-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr>
                  <td className="col-md-3">
                    <img
                      src={item.imgUrl}
                      alt="lauda"
                      height="100"
                      width="100"
                    />
                  </td>
                  <td className="col-md-3">{item.name}</td>
                  <td className="col-md-3">$ {item.price}</td>
                  <td>
                    <FaTrash
                      onClick={() => {
                        deleteCart(item);
                      }}
                    />
                  </td>
                </tr>
              );
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
