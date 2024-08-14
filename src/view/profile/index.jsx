import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultUser from "../../assets/user-default-avatar.png";
import Settings from "../../assets/settings.png";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import PostCards from "./post-card";
import { useGetMyPostsMutation } from "../../services/post";
import { errorToast } from "../../components/Toast/error";
import { getErrorMessage } from "../../utils/errorHandler";
import SinglePost from "./single-post";
import Popup from "./popup";
import { setLogout } from "../../redux/slices/userAuth";
import { useDeleteMyProfileMutation } from "../../services/userAuth";
import { successToast } from "../../components/Toast/success";

const Profile = () => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const userAuth = useSelector((state) => state?.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getMyPosts, { isLoading }] = useGetMyPostsMutation();
  const [deleteMyProfile] = useDeleteMyProfileMutation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getMyPosts(userAuth?.token).unwrap();
        setPosts(response.posts);
      } catch (error) {
        errorToast(getErrorMessage(error));
      }
    };

    fetchPosts();
  }, [getMyPosts]);

  const handleIconClick = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const logouthandler = async () => {
    dispatch(setLogout());
    navigate("/");
  };
  const deleteProfileHandler = async () => {
    try {
      const result = await deleteMyProfile(userAuth?.token)?.unwrap();
      if (result) {
        successToast("Profile Deleted Successfully", 500);
        setTimeout(() => {
          dispatch(setLogout());
          navigate(`/`);
        }, 500);
      }
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };
  const handlePostOpen = (post) => {
    setSelectedPost(post);
    setIsPostOpen(true);
  };
  const handlePostClose = () => {
    setSelectedPost(null);
    setIsPostOpen(false);
  };
  const Items = [
    {
      label: "Logout",
      onClick: logouthandler,
    },
    {
      label: "Delete My Profile",
      onClick: deleteProfileHandler,
    },
  ];
  return (
    <>
      <section className="max-[700px]:w-full w-[calc(100vw-70px)] lg:w-4/5 ml-auto py-5 px-5 md:px-10 md:py-10">
        <div className="user-info flex gap-10 items-center">
          <div className="avatar-section text-center">
            {userAuth?.user?.avatar ? (
              <>
                <div className="flex justify-center">
                  <div
                    className="avatar-background"
                    style={{
                      backgroundImage: `url(${userAuth?.user?.avatar.url})`,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <img className="user-profile-avatar" src={DefaultUser} alt="" />
              </>
            )}
          </div>
          <div className="user-detail-section flex flex-col gap-5">
            <div className="title-edit-profile-row flex items-center gap-5">
              <h3 className="text-2xl">{userAuth?.user?.username}</h3>
              <Link to="/accounts/edit">
                <button className="edit-profile-button">Edit Profile</button>
              </Link>
              <img
                className="settings-icon"
                src={Settings}
                onClick={handleIconClick}
                alt="profil-setting-icon"
              />
            </div>
            <div className="post-foolower-following-section flex">
              <h5>
                {userAuth?.user?.posts.length} <br /> posts
              </h5>
              <h5>
                {userAuth?.user?.followers.length} <br /> followers
              </h5>
              <h5>
                {userAuth?.user?.following.length} <br /> followings
              </h5>
            </div>
          </div>
        </div>
        <div className="mobile-post-following-section pb-2">
          <div className="post-foolower-following-section flex pt-2">
            <h5>
              {userAuth?.user?.posts.length} <br /> posts
            </h5>
            <h5>
              {userAuth?.user?.followers.length} <br /> followers
            </h5>
            <h5>
              {userAuth?.user?.following.length} <br /> followings
            </h5>
          </div>
        </div>
        <div className="myposts-section">
          <div className="posts-cards">
            {isLoading ? (
              <div className="h-[calc(100vh-206px)] w-full grid place-items-center">
                <div className="spinner"></div>
              </div>
            ) : posts?.length > 0 ? (
              posts.map((post) => (
                <PostCards
                  key={post._id}
                  post={post}
                  openPost={handlePostOpen}
                />
              ))
            ) : (
              <div className="h-[calc(100vh-206px)] w-full grid place-items-center">
                <h5 className="text-2xl">No Post Made Yet</h5>
              </div>
            )}
          </div>
        </div>
      </section>
      {isPostOpen && (
        <SinglePost onclose={handlePostClose} post={selectedPost} />
      )}
      {isPopupOpen && <Popup onClose={handleClosePopup} Items={Items} />}
    </>
  );
};

export default Profile;
