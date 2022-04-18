import React, { useState } from "react";
import fireDp from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Layout from "../components/Layout";

function Orders() {
  const [allItems, setAllItems] = useState([]);
  async function allOrders() {
    try {
      const currentUser = localStorage.getItem("userEmail");
      console.log(currentUser);
      const q = query(
        collection(fireDp, "orders"),
        where("userName", "==", currentUser)
      );
      const getAllItems = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let currentItem = doc.data().items;
        currentItem.forEach((item) => {
          getAllItems.push(item);
        });
        // getAllItems.push(doc.data().items);
        // console.log(doc.id, " => ", doc.data());
      });
      setAllItems(getAllItems);
      // console.log(getAllItems);
      console.log(allItems);
    } catch (error) {
      console.log(error);
    }
  }
  if (allItems.length > 0) {
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
              </tr>
            </thead>
            <tbody>
              {allItems.map((product) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={product.imgUrl}
                        alt=""
                        height="100"
                        width="100"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.qty}</td>
                    <td>$ {product.price * product.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default Orders;
