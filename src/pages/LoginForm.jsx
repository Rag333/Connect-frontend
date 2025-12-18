import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginForm = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!!!");
      console.error("❌ Login failed:", err);
    }
  };
  return (
    <div className="flex">
      <div className="flex items-center justify-center h-100 w-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            value={emailId}
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-800 font-semibold ">{Error}</p>
          <button className="btn btn-neutral mt-3" onClick={handleLogin}>
            Login
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default LoginForm;
