import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultUser from "../../assets/user-default-avatar.png";
import { useForm } from "react-hook-form";
import "./style.css";
import { useEditProfileMutation } from "../../services/userAuth";
import { errorToast } from "../../components/Toast/error";
import { getErrorMessage } from "../../utils/errorHandler";
import { setUser } from "../../redux/slices/userAuth";
import { successToast } from "../../components/Toast/success";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const userAuth = useSelector((state) => state?.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const initialValues = {
    email: `${userAuth?.user.email}`,
    name: `${userAuth?.user.name}`,
    username: `${userAuth?.user.username}`,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initialValues || {} });

  const watchAllFields = watch();

  useEffect(() => {
    const isChanged =
      initialValues.name !== watchAllFields.name ||
      initialValues.email !== watchAllFields.email ||
      initialValues.username !== watchAllFields.username ||
      avatar !== null;

    setIsFormChanged(isChanged);
  }, [watchAllFields, avatar]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };

    Reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      const result = await editProfile({
        email: data?.email,
        name: data?.name,
        username: data?.username,
        avatar,
        token: userAuth?.token,
      })?.unwrap();
      if (result) {
        dispatch(
          setUser({
            user: result?.user,
            token: userAuth?.token,
          })
        );
        successToast("Profile Updated Successfully", 500);
        setTimeout(() => {
          navigate(`/${userAuth?.user?.username}`);
        }, 500);
      }
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  return (
    <section className="max-[700px]:w-full w-[calc(100vw-70px)] lg:w-4/5 ml-auto py-5 px-5 md:px-10">
      <div className="edit-profile-form h-[calc(100vh-40px)] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center min-w-80 p-5 border"
        >
          <div className="flex flex-col items-center">
            {avatar || userAuth?.user?.avatar ? (
              <div className="flex justify-center">
                <div
                  className="avatar-background-setting"
                  style={{
                    backgroundImage: `url(${
                      avatar || userAuth?.user?.avatar.url
                    })`,
                  }}
                ></div>
              </div>
            ) : (
              <img src={DefaultUser} alt="" />
            )}
            <div className="choose-file pt-2">
              <input
                type="file"
                className="custom-input-file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="form-body edit-profile-body pt-3">
            <div className="mb-3 input grid">
              <label className="text-gray-500">Name</label>
              <input
                type="text"
                className="form-control border rounded focus:outline-1 focus:outline-gray-300"
                placeholder="Full Name"
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
            <div className="mb-3 input grid">
              <label className="text-gray-500">Email</label>
              <input
                type="text"
                className="form-control border rounded focus:outline-1 focus:outline-gray-300"
                id="exampleInputEmail1"
                faria-describedby="emailHelp"
                placeholder="Email"
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
            <div className="mb-3 input grid">
              <label className="text-gray-500">Username</label>
              <input
                type="text"
                className="form-control border rounded focus:outline-1 focus:outline-gray-300"
                aria-label="Username"
                placeholder="Username"
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
            <div className="text-center pt-2">
              <button
                disabled={!isFormChanged || isSubmitting || isLoading}
                type="submit"
                className="btn rounded-md btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
