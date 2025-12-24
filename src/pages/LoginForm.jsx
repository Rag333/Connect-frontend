import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginForm = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong";

      setError(message);
      console.error("❌ SignUp failed:", err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId, password, firstName, lastName },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!!!");
      console.error("❌ SignUp failed:", err);
    }
  };
  return (
    <div className="flex">
      <div className="flex items-center justify-center h-120 w-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            {isLoggedIn ? "Login" : "SignUp"}
          </legend>

          {!isLoggedIn && (
            <>
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

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
          <p className="text-red-800 font-semibold ">{error}</p>
          <button
            className="btn btn-neutral mt-3"
            onClick={isLoggedIn ? handleLogin : handleSignUp}
          >
            {isLoggedIn ? "Login" : "SignUp"}
          </button>

          <p
            className="flex justify-center cursor-pointer text-blue-600 hover:underline"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn
              ? "New User ? SignUp here"
              : "Existing User ? Login Here"}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default LoginForm;
