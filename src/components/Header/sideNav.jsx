import React from "react";
import { Link } from "react-router-dom";
import "./sidenav.css";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";

const SideNav = () => {
  const user = useSelector((state) => state?.userAuth?.user);

  return (
    <>
      <div className="desktop-navbar bg-black w-1/5 h-full fixed top-0 left-0 transition-all duration-300">
        <div className="brand_name absolute top-10">
          <Link to="/">
            <img
              src="/src/assets/brand-name-white.png"
              alt="crafteo_logo"
              className="text-white w-3/4 pl-5"
            />
          </Link>
          {/* <a href="/" className="hidden">
            <img
              className="crafteo-responsive"
              src="/image.png"
              alt="crafteo_logo"
            />
          </a> */}
        </div>
        <div className="menu absolute top-40 w-full">
          <ul className="list-none grid gap-5 px-3">
            <li className="text-white leading-12 py-2 px-3 hover:bg-primary-blue transition-all ease-in-out hover:rounded-xl">
              <Link to="/" className="text-light no-underline flex">
                <AiFillHome className="menu-icon mt-auto mb-auto text-3xl" />
                <span className="menu-list text-lg tracking-wide pl-2.5">
                  Home
                </span>
              </Link>
            </li>
            <li className="text-white leading-12 py-2 px-3 hover:bg-primary-blue transition-all ease-in-out hover:rounded-xl">
              <Link
                to="/create-new-post"
                className="text-light no-underline flex"
              >
                <BiMessageSquareAdd className="menu-icon mt-auto mb-auto text-3xl" />
                <span className="menu-list text-lg tracking-wide pl-2.5">
                  Create
                </span>
              </Link>
            </li>
            <li className="text-white leading-12 py-2 px-3 hover:bg-primary-blue transition-all ease-in-out hover:rounded-xl">
              <Link to="/search" className="text-light no-underline flex">
                <AiOutlineSearch className="menu-icon mt-auto mb-auto text-3xl" />
                <span className="menu-list text-lg tracking-wide pl-2.5">
                  Search
                </span>
              </Link>
            </li>
            <li className="text-white leading-12 py-2 px-3 hover:bg-primary-blue transition-all ease-in-out hover:rounded-xl">
              <Link to="/shop" className="text-light no-underline flex">
                <HiShoppingCart className="menu-icon mt-auto mb-auto text-3xl" />
                <span className="menu-list text-lg tracking-wide pl-2.5">
                  Shop
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="profile absolute bottom-14 w-full lg:ps-7">
          <div className="profile-dropdown flex items-center justify-center lg:justify-start">
            <Link
              to={`/${user?.username}`}
              className="text-light no-underline flex"
            >
              <Avatar />
              <div className="profile-heading menu-list m-auto">
                <h5 className="ps-3 text-white leading-8 tracking-wide">
                  Profile
                </h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
