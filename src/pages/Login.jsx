import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function loginUser() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userEmail", user.email);
        // if login is from admin then redirect to admin page
        if (user.email === "admin@gmail.com") {
          alert("Admin Login");
          navigate("/admin");
        }
        // else enter as a normal user
        else navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }
  return (
    <div className="register-page">
      <div className="row">
        <div className="col-md-6">
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_ab0pxvgc.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4">
          <div className="form-register">
            <h1>LOGIN</h1>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <button
              onClick={() => {
                loginUser();
              }}
            >
              Login
            </button>
            <hr />
            <Link to="/register">New User? Click Here to Register!</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
