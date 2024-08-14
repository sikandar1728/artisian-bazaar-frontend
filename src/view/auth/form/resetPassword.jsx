import React, { useEffect, useRef, useState } from "react";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useResetPasswordMutation,
  useVerifyResetPasswordLinkMutation,
} from "../../../services/userAuth";
import { errorToast } from "../../../components/Toast/error";
import { getErrorMessage } from "../../../utils/errorHandler";
import { successToast } from "../../../components/Toast/success";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [verifyResetPasswordLink] = useVerifyResetPasswordLinkMutation();
  const [resetPassword, { isSuccess: resetPasswordSuccess, isLoading }] =
    useResetPasswordMutation();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const verifyLink = async () => {
      try {
        const response = await verifyResetPasswordLink({ id, token }).unwrap();
        if (!response) {
          navigate("*");
        }
      } catch (error) {
        errorToast(getErrorMessage(error));
        navigate("*");
      }
    };
    console.log(token, "token value")
    if (token) {
      verifyLink();
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      await resetPassword({ data, id, token })?.unwrap();
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      reset();
      successToast("Password Reset Successfull", 1000);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [resetPasswordSuccess]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`p-2 border rounded outline-1 w-full relative ${
              errors?.password
                ? "border-red-600 outline-red-600"
                : "outline-gray-200"
            }`}
            {...register("password", {
              required: "Password is required!",
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message:
                  "Password must contain atleast 8 characters, digit and a special character",
              },
            })}
          />
          {password && (
            <MdOutlineVisibilityOff
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {errors?.password && (
          <p className="text-red-600">{errors?.password?.message}</p>
        )}
      </div>
      <div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className={`p-2 border rounded outline-1 w-full ${
              errors?.confirmPassword
                ? "border-red-600 outline-red-600"
                : "outline-gray-200"
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password!",
              validate: (value) =>
                value === password || "Passwords do not match!",
            })}
          />
          {confirmPassword && (
            <MdOutlineVisibilityOff
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </div>
        {errors?.confirmPassword && (
          <p className="text-red-600">{errors?.confirmPassword?.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-primary-blue text-white py-3 rounded mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
