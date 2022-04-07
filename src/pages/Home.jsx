import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import StoreItems from "../initialStoreItems";
import { collection, getDocs } from "firebase/firestore";
import fireDp from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setproducts] = useState([]);
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

  return (
    <Layout>
      <div className="container">
        <div className="row">
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
                    <button>ADD TO CART</button>
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
