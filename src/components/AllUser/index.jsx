import { Link } from "react-router-dom";
import DefaultUser from "../../assets/user-default-avatar.png";
import "./style.css";
import { useFollowUnfollowUserMutation } from "../../services/userAuth";
import { errorToast } from "../Toast/error";
import { getErrorMessage } from "../../utils/errorHandler";
import { successToast } from "../Toast/success";
import { useSelector } from "react-redux";

const AllUsers = ({ username, userAvatar, userId, followhandler }) => {
  return (
    <>
      <div className="users flex items-center gap-2">
        <Link to={`/${username}`}>
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${userAvatar ? userAvatar : DefaultUser})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </Link>
        <div className="username ms-2">
          <Link to={`/${username}`}>
            <h5>{username}</h5>
          </Link>
          {userId ? (
            <button
              className="opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ cursor: "pointer" }}
              onClick={() => followhandler(userId)}
            >
              Follow
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
