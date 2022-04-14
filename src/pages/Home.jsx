import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import StoreItems from "../initialStoreItems";
import { collection, getDocs } from "firebase/firestore";
import fireDp from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.CartReducer);
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  async function getdata() {
    const allProducts = [];
    const docs = await getDocs(collection(fireDp, "games"));
    docs.forEach((item) => {
      const obj = {
        id: item.id,
        ...item.data(),
      };
      allProducts.push(obj);
    });
    setproducts(allProducts);
  }
  //at start store cartItems in local storage to keep track later, useEffect will store new state of cartItems at each document loading
  //this step is useful to update the cart number in navigation bar each time we update the cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  function addToCart(product) {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, qty: 1 } });
  }
  return (
    <Layout>
      <div className="container pt-5">
        <div className="row pt-5">
          {products.map((item) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{item.name}</p>
                    <img src={item.imgUrl} alt="" className="products_img" />
                    <p>{item.description}</p>
                  </div>
                  <div className="product-actions">
                    <h2>$ {item.price}</h2>
                    <button
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/productInfo/${item.id}`);
                      }}
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
