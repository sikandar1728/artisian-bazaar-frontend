import React from "react";
import { RxLockClosed } from "react-icons/rx";
import DefaultHeader from "../../../components/Header/default";
import ResetPasswordForm from "../form/resetPassword";

const ResetPassword = () => {
  return (
    <>
      <DefaultHeader isLinksVisible />
      <section className="h-[calc(100vh-83px)] flex flex-col items-center justify-center max-sm:mx-5">
        <div className="flex flex-col items-center gap-3 max-w-md p-7 sm:p-12 border border-gray-300 relative">
          <div className="w-max border-2 border-black rounded-full p-4">
            <RxLockClosed className="w-16 h-16 " />
          </div>
          <h4 className="font-semibold text-xl">Create a strong password</h4>
          <p className="text-center max-sm:text-sm">
            Your password must be at least eight characters and should include a
            combination of numbers, letters and special characters (!$@％).
          </p>
          <ResetPasswordForm />
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
