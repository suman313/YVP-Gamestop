import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

function SingleCartItem({ product }) {
  const [productQty, setProductQty] = useState(product.qty);
  const dispatch = useDispatch();
  const updateQty = (e) => {
    //because e.target.value is a string so convert it to a number then assign
    let currentQty = parseInt(e.target.value);
    setProductQty(currentQty);
    dispatch({
      type: "UPDATE_QTY",
      payload: product,
      quantity: currentQty,
    });
  };
  function deleteCart(product) {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  }
  return (
    <tr>
      <td>
        <img src={product.imgUrl} alt="" height="100" width="100" />
      </td>
      <td>{product.name}</td>
      <td>
        <input type="number" min={1} value={productQty} onChange={updateQty} />
      </td>
      <td>$ {product.price * product.qty}</td>
      <td>
        <FaTrash
          onClick={() => {
            deleteCart(product);
          }}
        />
      </td>
    </tr>
  );
}

export default SingleCartItem;
