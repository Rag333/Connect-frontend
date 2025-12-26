import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} — All rights reserved
        </p>

        <div className="flex gap-4">
          <a className="hover:text-primary cursor-pointer">Twitter</a>
          <a className="hover:text-primary cursor-pointer">YouTube</a>
          <a className="hover:text-primary cursor-pointer">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
