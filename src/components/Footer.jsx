import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">ConnectwMe</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 text-sm font-medium">
          <a className="cursor-pointer hover:text-primary transition">
            Twitter
          </a>
          <a className="cursor-pointer hover:text-primary transition">
            YouTube
          </a>
          <a className="cursor-pointer hover:text-primary transition">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
