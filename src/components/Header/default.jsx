import React from "react";
import { Link } from "react-router-dom";

const DefaultHeader = ({ isLinksVisible }) => {
  return (
    <header className="w-full border-b border-gray-300">
      <div className="max-w-[80%] mx-auto py-5 flex items-center">
        <Link to="/">
          <img
            src="/src/assets/brand-name.png"
            alt="brand name"
            className="w-80 h-auto"
          />
        </Link>
        {isLinksVisible && (
          <div className="ml-auto flex gap-5 items-center">
            <Link
              to="/"
              className="bg-primary-blue text-white rounded-md px-3 py-1"
            >
              Log in
            </Link>
            <Link to="/register" className="text-primary-blue hover:text-black">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default DefaultHeader;
