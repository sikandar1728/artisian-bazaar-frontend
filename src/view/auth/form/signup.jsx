import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../../../utils/errorHandler";
import { useUserRegisterMutation } from "../../../services/userAuth";

import { errorToast } from "../../../components/Toast/error";
import { successToast } from "../../../components/Toast/success";

const UserSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");

  const [userRegister, { isLoading, isSuccess}] = useUserRegisterMutation();

  const onSubmit = async (data) => {
    try {
      await userRegister(data).unwrap();
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      successToast("Registration Successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isSuccess, navigate]);

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
        <input
          type="text"
          placeholder="Full Name"
          className={`p-2 border rounded w-full outline-1 ${
            errors?.name ? "border-red-600 outline-red-600" : "outline-gray-200"
          }`}
          {...register("name", {
            required: "Name is required!",
            minLength: {
              value: 3,
              message: "Name must contain atleast 3 characters",
            },
          })}
        />
        {errors?.name && (
          <p className="text-red-600">{errors?.name?.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className={`p-2 border rounded w-full outline-1 ${
            errors?.username
              ? "border-red-600 outline-red-600"
              : "outline-gray-200"
          }`}
          {...register("username", {
            required: "Username is required!",
            pattern: {
              value:
                /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
              message: "Invalid username!",
            },
          })}
        />
        {errors?.username && (
          <p className="text-red-600">{errors?.username?.message}</p>
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
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-black text-white py-3 rounded mt-5"
      >
        Sign up
      </button>
      <p className="text-center text-lg">
        Have an account?{" "}
        <Link to="/" className="text-primary-blue">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default UserSignupForm;
