import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@s.com" && password === "admin123") {
      dispatch({ type: "SET_USER", payload: { email, role: "admin" } });
      navigate("/admin-dashboard");
    } else {
      dispatch({ type: "SET_USER", payload: { email, role: "user" } });
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input type="email" placeholder="Email" className="form-control my-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="form-control my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
