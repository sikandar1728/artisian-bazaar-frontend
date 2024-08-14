import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../services/post";
import { errorToast } from "../../components/Toast/error";
import { getErrorMessage } from "../../utils/errorHandler";
import { setUser } from "../../redux/slices/userAuth";
import { successToast } from "../../components/Toast/success";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state?.userAuth);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };

    Reader.readAsDataURL(file);
  };

  const submithandler = async (data) => {
    try {
      const result = await createPost({
        caption: data?.caption,
        image,
        token: userAuth?.token,
      })?.unwrap();
      if (result) {
        const updatedUser = {
          ...userAuth.user,
          posts: [...userAuth.user.posts, result.post],
        };
        dispatch(setUser({ user: updatedUser, token: userAuth.token }));
        successToast("Post Created Successfully", 500);
        setTimeout(() => {
          navigate(`/${userAuth?.user?.username}`);
        }, 500);
      }
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  return (
    <div className="md:w-[calc(100vw-70px)] lg:w-4/5 ml-auto flex justify-center py-5 px-5 md:px-10 md:py-10">
      <div className="create-new-post-section pt-10 w-full lg:w-3/4">
        {image ? (
          <form
            onSubmit={handleSubmit(submithandler)}
            className="post-secondary-section pt-4 flex flex-col gap-10"
          >
            <div className="sm:flex gap-10">
              <div className="image-selector-section text-center">
                <div className="post-image pt-3 pb-3">
                  <img
                    className="post-display-image m-auto"
                    src={image}
                    alt="post"
                  />
                </div>
                <div className="file-chosen pt-3 pb-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={handleImageChange}
                    name="postEditImage"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="post-content-section ">
                <div className="post-caption pb-4">
                  <textarea
                    type="text"
                    rows={10}
                    placeholder="Wtite a Caption..."
                    name="caption"
                    {...register("caption")}
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              disabled={isSubmitting || isLoading}
              type="submit"
              className="w-max ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
        ) : (
          <div className="initial-post-section">
            <form className="text-center pt-5 pb-5 flex flex-col gap-10">
              <div className="upload-image">
                <img
                  src="/src/assets/upload-image.png"
                  alt="uploadImage"
                  className="m-auto"
                />
              </div>
              <div className="file-chosen">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={handleImageChange}
                  name="postImage"
                  accept="image/*"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
