import React from "react";
import { RxLockClosed } from "react-icons/rx";
import DefaultHeader from "../../../components/Header/default";
import ForgotPasswordForm from "../form/forgotPassword";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <DefaultHeader />
      <section className="h-[calc(100vh-83px)] flex flex-col items-center justify-center max-sm:mx-5">
        <div className="flex flex-col items-center gap-3 max-w-md px-7 sm:px-12 py-7 border border-gray-300 relative">
          <div className="w-max border-2 border-black rounded-full p-4">
            <RxLockClosed className="w-16 h-16 " />
          </div>
          <h4 className="font-semibold text-xl">Trouble with logging in?</h4>
          <p className="text-center max-sm:text-sm">
            Enter your email address and we'll send you a link to get back into
            your account.
          </p>
          <ForgotPasswordForm />
          <Link
            to="/"
            className="bg-[#F9F9F9] border w-full absolute bottom-0 flex justify-center items-center p-3 transition-all ease-in-out duration-300 hover:text-primary-blue"
          >
            Back to Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
