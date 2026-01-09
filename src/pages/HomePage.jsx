import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      {/* HERO */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row gap-16">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-6xl font-extrabold leading-tight">
              Connect<span className="text-primary">w</span>Me
            </h1>

            <p className="mt-6 text-lg opacity-80">
              A social interactive platform where conversations turn into
              <span className="font-semibold text-primary">
                {" "}
                real connections
              </span>
              .
            </p>

            <p className="mt-3 text-sm opacity-70">
              Meet people. Share interests. Chat freely. Build meaningful bonds
              — not just followers.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/login">
                <button className="btn btn-primary btn-lg shadow-lg">
                  Get Started
                </button>
              </Link>

              <Link to="/about">
                <button className="btn btn-outline btn-lg">Learn More</button>
              </Link>
            </div>

            {/* SOCIAL PROOF */}
            <div className="mt-10 flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-xs opacity-60">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-xs opacity-60">Connections Made</p>
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs opacity-60">Live Chats</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL CARD */}
          <div className="relative">
            <div className="card w-96 bg-base-100 shadow-2xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title">👋 Welcome to ConnectwMe</h2>
                <p className="text-sm opacity-70">
                  Discover people who share your interests and start
                  conversations that matter.
                </p>

                {/* Fake chat preview */}
                <div className="mt-4 space-y-2">
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                      Hey! Love your profile 👋
                    </div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-bubble">Thanks! Let’s connect 😊</div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <span className="badge badge-success">Live</span>
                  <span className="badge badge-outline">Secure</span>
                </div>
              </div>
            </div>

            {/* Floating glow */}
            <div className="absolute -inset-2 bg-primary opacity-20 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
