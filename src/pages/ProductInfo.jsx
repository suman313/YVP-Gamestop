import React from "react";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import fireDp from "../firebaseConfig";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { BsCartPlusFill } from "react-icons/bs";

export default function ProductInfo() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getdata();
  }, []);
  async function getdata() {
    try {
      // const tempArray = [];
      const productTemp = await getDoc(doc(fireDp, "games", params.productId));
      // tempArray.push(productTemp.data());
      setProduct(productTemp.data());
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }
  function addToCart(product) {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }
  return (
    <Layout>
      <div className="OneProduct">
        <img src={product.imgUrl} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            addToCart(product);
          }}
        >
          ADD TO CART<span> </span>
          <BsCartPlusFill />
        </button>
      </div>
    </Layout>
  );
}
