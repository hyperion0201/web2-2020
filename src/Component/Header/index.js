import React from "react";
import "./style.scss";
import { getCookie, removeCookie } from "../../helpers/cookie";
import Profile from "../profile";

const Header = () => {
  const isLogin = getCookie("user_token");

  const handleLogout = () => {
    removeCookie("user_token");
    window.location.replace("/");
  };

  return (
    <div className="header">
      <div className="header-nav">
        <div className="nav-bar">
          <img
            className="logo"
            onClick={() => window.location.replace("/")}
            src="/images/logo.png"
            alt=""
          />
          {!isLogin ? (
            <div className="link-group">
              <a href="/login" className="link-btn">
                Log in
              </a>
              <a href="/register" className="link-btn sign-up">
                Sign up
              </a>
            </div>
          ) : (
            <div className="link-group">
              <a href="/account" className="link-btn">
                List accounts
              </a>
              <a href="/transfer" className="link-btn">
                Transfer
              </a>
              <a href="/user-management" className="link-btn">
                User Management
              </a>
              <span onClick={handleLogout} className="link-btn">
                Log out
              </span>
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
