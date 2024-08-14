import React from "react";
import Defaultavatar from "../../assets/user-default-avatar.png";
import { useSelector } from "react-redux";

const Avatar = () => {
  const user = useSelector((state) => state?.userAuth?.user);

  return (
    <div
      className="w-10 h-10 rounded-full"
      style={{
        backgroundImage: `url(${
          user?.avatar ? user.avatar.url : Defaultavatar
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default Avatar;
