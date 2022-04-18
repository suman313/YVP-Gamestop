import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import fireDp from "../../firebaseConfig";

function AddProducts() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  async function clickSubmit() {
    const docRef = await addDoc(collection(fireDp, "games"), {
      category: category,
      description: description,
      imgUrl: imgUrl,
      name: name,
      price: price,
    });
    console.log(docRef);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(e) => setImgUl(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <button onClick={() => clickSubmit()}>add Now</button>
    </div>
  );
}

export default AddProducts;
