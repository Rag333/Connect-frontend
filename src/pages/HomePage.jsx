import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const HomePage = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there !</h1>
            <p className="py-6 ">
              Build meaningful connections. Not just contacts.
            </p>
            <button className="btn btn-primary">
              <Link to="/login">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
