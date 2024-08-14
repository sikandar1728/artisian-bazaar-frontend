import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center text-center items-center gap-10">
        <img src={errorImage} alt="404 page not found" />
        <h2 className="text-3xl font-bold">UH OH! You're lost.</h2>
        <div className="flex flex-col items-center gap-5 w-1/2">
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <Link
            to="/"
            className="bg-primary-blue text-white px-5 py-3 rounded mt-5 text-xl font-semibold max-w-max"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
