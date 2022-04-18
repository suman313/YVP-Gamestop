import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  // const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [err, setErr] = useState("");
  function buttonClicked() {
    if (email === "" || password === "" || cpassword === "") {
      setErr("Every field is required!");
    } else if (password !== cpassword) {
      setErr(
        "password and confirm password do not match! Please enter carefully!"
      );
      setPassword("");
      setCpassword("");
    } else {
      userRegister();
      setEmail("");
      setCpassword("");
      setPassword("");
      setErr("");
    }
  }
  async function userRegister() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`${user.email} registered successfully!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      });
  }
  return (
    <div className="register-page">
      <div className="row">
        <div className="col-md-6">
          <lottie-player
            src="https://assets6.lottiefiles.com/private_files/lf30_yLIteV.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4">
          <div className="form-register">
            <h1>REGISTER</h1>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input
              className="form-control"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            /> */}
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button
              onClick={() => {
                buttonClicked();
              }}
            >
              Register
            </button>
            <div className="err-msg"> {err}</div>
            <div className="goToLogin">
              <Link to="/login"> Already Registered? Login Here!</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
