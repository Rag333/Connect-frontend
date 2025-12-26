import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

/**
 * Safely extract meaningful error message from axios error
 */
const getErrorMessage = (err) => {
  if (err.response) {
    const data = err.response.data;

    if (typeof data === "string") return data;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    return "Request failed. Please try again.";
  }

  if (err.request) {
    return "Server not reachable. Please check your connection.";
  }

  return err.message || "Something went wrong";
};

const LoginForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // 🆕 SIGNUP
  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-98">
      <fieldset className="fieldset bg-base-200 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-lg font-semibold">
          {isLoginMode ? "Login" : "Sign Up"}
        </legend>

        {!isLoginMode && (
          <>
            <label className="label">First Name</label>
            <input
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 mt-3 text-sm text-center">{error}</p>
        )}

        <button
          className="btn btn-neutral mt-4 w-full"
          disabled={loading}
          onClick={isLoginMode ? handleLogin : handleSignUp}
        >
          {loading ? "Please wait..." : isLoginMode ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-blue-600 text-center cursor-pointer mt-3 text-sm"
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError("");
          }}
        >
          {isLoginMode ? "New user? Sign up" : "Already have an account? Login"}
        </p>
      </fieldset>
    </div>
  );
};

export default LoginForm;
