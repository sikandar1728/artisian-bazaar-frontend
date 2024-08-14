import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultUser from "../../assets/user-default-avatar.png";
import Settings from "../../assets/settings.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import PostCards from "./post-card";
import {
  useGetMyPostsMutation,
  useGetUserPostsMutation,
} from "../../services/post";
import { errorToast } from "../../components/Toast/error";
import { getErrorMessage } from "../../utils/errorHandler";
import SinglePost from "./single-post";
import Popup from "./popup";
import { setLogout } from "../../redux/slices/userAuth";
import {
  useDeleteMyProfileMutation,
  useFollowUnfollowUserMutation,
  useGetUserProfileMutation,
} from "../../services/userAuth";
import { successToast } from "../../components/Toast/success";

const UserProfile = () => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const userAuth = useSelector((state) => state?.userAuth);
  const [following, setFollowing] = useState(
    userAuth?.user?.following.includes(user?._id)
  );

  console.log(userAuth?.user?.following);
  const params = useParams();

  const [getUserProfile, { isLoading: userLoading }] =
    useGetUserProfileMutation();
  const [getUserPosts, { isLoading: postLoading }] = useGetUserPostsMutation();
  const [followUnfollowUser, isLoading] = useFollowUnfollowUserMutation();

  const followhandler = async (userId) => {
    try {
      console.log(userId);
      const result = await followUnfollowUser({
        id: userId,
        token: userAuth?.token,
      })?.unwrap();
      if (result) {
        setFollowing(!following);
        successToast(result?.message, 500);
      }
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile({
          username: params?.username,
          token: userAuth?.token,
        }).unwrap();
        setUser(response.user);
      } catch (error) {
        errorToast(getErrorMessage(error));
      }
    };

    fetchUser();
  }, [getUserProfile]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getUserPosts({
          username: params?.username,
          token: userAuth?.token,
        }).unwrap();
        setPosts(response.posts);
      } catch (error) {
        errorToast(getErrorMessage(error));
      }
    };

    fetchPosts();
  }, [getUserPosts]);

  const handlePostOpen = (post) => {
    setSelectedPost(post);
    setIsPostOpen(true);
  };
  const handlePostClose = () => {
    setSelectedPost(null);
    setIsPostOpen(false);
  };

  return (
    <>
      <section className="max-[700px]:w-full w-[calc(100vw-70px)] lg:w-4/5 ml-auto py-5 px-5 md:px-10 md:py-10">
        <div className="user-info flex gap-10 items-center">
          <div className="avatar-section text-center">
            {user?.avatar ? (
              <>
                <div className="flex justify-center">
                  <div
                    className="avatar-background"
                    style={{
                      backgroundImage: `url(${user?.avatar.url})`,
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
              <h3 className="text-2xl">{user?.username}</h3>
              <button
                className="ms-4 edit-profile-button"
                onClick={() => followhandler(user?._id)}
              >
                {following ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="post-foolower-following-section flex gap-5">
              <h5>
                {user?.posts?.length} <br /> posts
              </h5>
              <h5>
                {user?.followers?.length} <br /> followers
              </h5>
              <h5>
                {user?.following?.length} <br /> followings
              </h5>
            </div>
          </div>
        </div>
        <div className="mobile-post-following-section pb-2">
          <div className="post-foolower-following-section flex pt-2 gap-5">
            <h5>
              {user?.posts?.length} <br /> posts
            </h5>
            <h5>
              {user?.followers?.length} <br /> followers
            </h5>
            <h5>
              {user?.following?.length} <br /> followings
            </h5>
          </div>
        </div>
        <div className="myposts-section">
          <div className="posts-cards">
            {userLoading && postLoading ? (
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
    </>
  );
};

export default UserProfile;
