import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import DefaultUser from "../../assets/user-default-avatar.png";
import { Link } from "react-router-dom";

const SinglePost = ({ onclose, post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const likehandler = () => {
    if (liked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setLiked((prevLiked) => !prevLiked);
    // dispatch(likeandUnlike(post._id));
  };
  return (
    <div className="singlepost-overlay">
      <AiOutlineClose className="w-8 h-8" onClick={onclose} />
      <div className="singlepost-content flex">
        <div className="single-post md:flex w-full">
          <div
            className="singlepost-image max-md:h-80 max-md:!w-full"
            style={{ backgroundImage: `url(${post?.image?.url})` }}
          ></div>
          <div className="singlepost-body max-md:!w-full relative">
            <div className="users flex items-center mb-3">
              <Link to={`/${post.owner.username}`}>
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${
                      post?.owner.avatar?.url
                        ? post?.owner.avatar?.url
                        : DefaultUser
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </Link>
              <div className="username ms-2">
                <Link to={`/${post.owner.username}`}>
                  <h5 className="text-2xl">{post.owner.username}</h5>
                </Link>
              </div>
            </div>
            <div className="caption">
              <p className="text-lg">{post.caption}</p>
            </div>
            <div className="like-comment-section">
              <div className="like-comments-icons text-start text-black flex">
                <span onClick={likehandler} className="cursor-pointer">
                  {liked ? (
                    <BsHeartFill style={{ color: "red" }} />
                  ) : (
                    <BsHeart />
                  )}
                </span>
                <FaRegCommentDots className="ms-4" />
              </div>
              <div className="likes-number text-start pt-3 text-black">
                <h6 style={{ cursor: "pointer" }}>{likeCount} likes</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
