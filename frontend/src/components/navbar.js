import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import "../styles/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";

import { useNavigate } from "react-router-dom";

const Navbar = ({ onSignIn }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.role === "admin");
  const totalCartItems = useSelector((state) => state.cart.foodItems.itemCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const signInHandler = () => {
    onSignIn();
  };

  const logOutHandler = () => {
    sessionStorage.clear();
    navigate('/')
    dispatch(logout());
  };

  const showBackButton = location.pathname !== "/";

  return (
    <div className="navbar" id="nav">
      <div className="back-button" onClick={() => navigate(-1)}>
        {showBackButton && <IoMdArrowRoundBack />}
      </div>
      <div className="logo">Food App</div>
      <div className="navbar-resize-gap"></div>
      <div className="nav-items">
        <ul>
          <Link to="/">
            {" "}
            <li>
              {" "}
              <IoHomeOutline /> &nbsp; <span className="navbar-span-remove">Home</span>
            </li>
          </Link>
          <Link to="/search">
            {" "}
            <li>
              <CiSearch /> &nbsp; <span className="navbar-span-remove">Search</span>
            </li>
          </Link>
          {!isAdmin && (
            <Link to="/offers">
              {" "}
              <li>
                {" "}
                <BiSolidOffer /> &nbsp; <span className="navbar-span-remove">Offers</span>
              </li>
            </Link>
          )}
          <Link to="/cart">
            {" "}
            <li className="cart">
              <svg
                class="_1GTCc _173fq"
                viewBox="-1 0 37 32"
                height="20"
                width="20"
              >
                <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
              </svg>
              <span className="span-cart">{totalCartItems}</span> &nbsp;
              <span className="navbar-span-remove">Cart</span>
            </li>
          </Link>
          {isAuthenticated && (
            <Link to="/user">
              <li>
                <FaRegUser /> &nbsp; <span className="navbar-span-remove"> User</span>
              </li>
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin">
              <li>
                {" "}
                <MdAdminPanelSettings /> &nbsp;<span className="navbar-span-remove">Admin</span>
              </li>{" "}
            </Link>
          )}
          {isAuthenticated ? (
            <li onClick={logOutHandler}>
              <BiLogOut /> &nbsp; <span className="navbar-span-remove">LogOut</span>
            </li>
          ) : (
            <li onClick={signInHandler}>
              {" "}
              <FaRegUser /> &nbsp; <span className="navbar-span-remove">SignIn</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
