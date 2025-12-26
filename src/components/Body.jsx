import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import HomePage from "../pages/HomePage";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // 🔑 THIS DIV FIXES EVERYTHING
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {location.pathname === "/" ? <HomePage /> : <Outlet />}
      </main>

      {/* FOOTER ALWAYS AT BOTTOM */}
      <Footer />
    </div>
  );
};

export default Body;
