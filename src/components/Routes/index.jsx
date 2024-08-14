import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../../view/auth/login";
import Signup from "../../view/auth/register";
import ForgotPassword from "../../view/auth/ForgotPassword";
import ResetPassword from "../../view/auth/ResetPassword";
import { useSelector } from "react-redux";
import Home from "../../view/home";
import NotFound from "../../view/NotFound";
import SideNav from "../Header/sideNav";
import CreatePost from "../../view/post/create-post";
import Profile from "../../view/profile";
import EditProfile from "../../view/editProfile";
import UserProfile from "../../view/userProfile";

const AppRoutes = () => {
  const userAuth = useSelector((state) => state?.userAuth);
  return (
    <>
      {userAuth?.isLoggedIn && <SideNav />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={userAuth?.isLoggedIn ? <Home /> : <Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/accounts/password/reset/" element={<ForgotPassword />} />
        <Route
          path="/accounts/password/reset/confirm/:id/:token"
          element={<ResetPassword />}
        />

        <Route
          path={`/${userAuth?.user?.username}`}
          element={userAuth?.isLoggedIn ? <Profile /> : <Login />}
        />
        <Route
          path={`/:username`}
          element={userAuth?.isLoggedIn ? <UserProfile /> : <Login />}
        />

        <Route
          path="create-new-post"
          element={userAuth?.isLoggedIn ? <CreatePost /> : <Login />}
        />

        <Route
          path="/accounts/edit"
          element={userAuth?.isLoggedIn ? <EditProfile /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
