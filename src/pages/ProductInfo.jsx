import React from "react";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import fireDp from "../firebaseConfig";
import Layout from "../components/Layout";

export default function ProductInfo() {
  const [product, setProduct] = useState();
  const params = useParams();
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
  return (
    <Layout>
      <img src={product.imgUrl} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </Layout>
  );
}
