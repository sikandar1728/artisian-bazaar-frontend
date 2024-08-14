import React, { useEffect, useState } from "react";
import { useGetPostOfFloowingMutation } from "../services/post";
import { useSelector } from "react-redux";
import { errorToast } from "../components/Toast/error";
import { getErrorMessage } from "../utils/errorHandler";
import "../style/home.css";
import { Link } from "react-router-dom";
import DefaultUser from "../assets/user-default-avatar.png";
import AllUsers from "../components/AllUser";
import {
  useFollowUnfollowUserMutation,
  useGetAllUsersMutation,
} from "../services/userAuth";
import { FadeLoader } from "react-spinners";
import Posts from "./Posts/Posts";
import Defaultavatar from "../assets/user-default-avatar.png";
import NoPost from "../assets/no-photo.png";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const userAuth = useSelector((state) => state?.userAuth);
  const [getPostOfFloowing, { isLoading: postsLoading }] =
    useGetPostOfFloowingMutation();
  const [getAllUsers, { isLoading: usersLoading }] = useGetAllUsersMutation();
  const [followUnfollowUser, isLoading] = useFollowUnfollowUserMutation();

  console.log(posts, "-----");

  const followhandler = async (userId) => {
    try {
      console.log(userId);
      const result = await followUnfollowUser({
        id: userId,
        token: userAuth?.token,
      })?.unwrap();
      if (result) {
        successToast(result?.message, 500);
      }
    } catch (error) {
      errorToast(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const fetchPostsoffollowing = async () => {
      try {
        const response = await getPostOfFloowing(userAuth?.token)?.unwrap();
        setPosts(response?.posts);
      } catch (error) {
        errorToast(getErrorMessage(error));
      }
    };
    fetchPostsoffollowing();
  }, [getPostOfFloowing, followUnfollowUser]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers(userAuth?.token)?.unwrap();
        setUsers(response?.users);
      } catch (error) {
        errorToast(getErrorMessage(error));
      }
    };
    fetchAllUsers();
  }, [getAllUsers, followUnfollowUser]);

  return (
    <main className="max-[700px]:w-full w-[calc(100vw-70px)] lg:w-4/5 ml-auto py-5 px-5 md:px-10 md:py-10 flex">
      <div className="posts-section">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Posts
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                ownerName={post.owner.username}
                ownerImage={
                  post.owner.avatar ? post.owner.avatar.url : Defaultavatar
                }
                ownerId={post.owner._id}
                likes={post.likes}
                comments={post.comments}
              />
            );
          })
        ) : (
          <div className="no-post-section display-grid place-items-center">
            <div className="text-center">
              <img src={NoPost} alt="No post yet" />
              <h4 className="pt-3">No Post Yet</h4>
            </div>
          </div>
        )}
      </div>
      <div className="suggested-users-section flex flex-col gap-5">
        <Link
          to={`/${userAuth?.user?.username}`}
          className="flex gap-5 items-center"
        >
          {userAuth?.user?.avatar ? (
            <>
              <div className="flex">
                <div
                  className="avatar-background !w-16 !h-16"
                  style={{
                    backgroundImage: `url(${userAuth?.user?.avatar.url})`,
                  }}
                ></div>
              </div>
            </>
          ) : (
            <>
              <img
                className="user-profile-avatar !w-16 !h-16"
                src={DefaultUser}
                alt=""
              />
            </>
          )}
          <div>
            <h4 className="text-lg font-semibold">
              {userAuth?.user?.username}
            </h4>
            <span className="text-gray-400">{userAuth?.user?.name}</span>
          </div>
        </Link>
        <h5 className="mt-3">Suggested for you</h5>
        {usersLoading ? (
          <FadeLoader className="mt-10 mx-auto" width={5} height={5} />
        ) : users && users.length > 0 ? (
          users.map((user) => {
            return (
              <AllUsers
                key={user?._id}
                userAvatar={user?.avatar ? user?.avatar.url : DefaultUser}
                username={user?.username}
                userId={user?._id}
                followhandler={followhandler}
              />
            );
          })
        ) : (
          <h4>No More User To Follow</h4>
        )}
      </div>
    </main>
  );
};

export default Home;
