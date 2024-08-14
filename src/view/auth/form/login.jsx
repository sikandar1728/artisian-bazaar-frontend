import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { getErrorMessage } from "../../../utils/errorHandler";

import { useUserLoginMutation } from "../../../services/userAuth";
import { setUser } from "../../../redux/slices/userAuth";

import { errorToast } from "../../../components/Toast/error";
import { successToast } from "../../../components/Toast/success";

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");

  const [userLogin, { isLoading, isSuccess }] = useUserLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await userLogin(data)?.unwrap();
      setTimeout(() => {
        dispatch(setUser(response));
      }, 1000);
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      successToast("Login Successful", 1000);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-col gap-5 w-80 2xl:w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          type="text"
          placeholder="Email address"
          className={`p-2 border rounded w-full outline-1 ${
            errors?.email
              ? "border-red-600 outline-red-600"
              : "outline-gray-200"
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
      </div>
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`p-2 border rounded outline-1 w-full ${
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
      <Link to="/accounts/password/reset" className="text-end">
        Forgot Password?
      </Link>
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-black text-white py-3 rounded mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Log in
      </button>
      <p className="text-center text-lg">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary-blue">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default UserLoginForm;
