import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../../../utils/errorHandler";
import { useForgotPasswordMutation } from "../../../services/userAuth";

import { successToast } from "../../../components/Toast/success";
import { errorToast } from "../../../components/Toast/error";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data)?.unwrap();
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("We've sent an email to your account!", false);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Email address"
        className={`p-2 border rounded outline-1 ${
          errors?.email ? "border-red-600 outline-red-600" : "outline-gray-200"
        }`}
        {...register("email", {
          required: "Email is required!",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            message: "Invalid email format!",
          },
        })}
      />
      {errors?.email && (
        <p className="text-red-600">{errors?.email?.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-primary-blue text-white py-3 rounded mt-3 mb-16 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Send Login Link
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
