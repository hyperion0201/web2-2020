import React from "react";
import "./style.scss";
import { getCookie, removeCookie } from "../../helpers/cookie";

const Header = () => {
  const isLogin = getCookie("user_token");

  const handleLogout = () => {
    removeCookie("user_token");
    window.location.replace("/");
  };

  const handleShowProfile = () => {
    let profile = document.getElementById("profileRef");
      profile && profile.classList.add("show");
  }

  return (
    <div className="header">
      <div className="nav-bar">
        <p>VNBC Bank</p>
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
            <span onClick={handleShowProfile} className="link-btn">
              Profile
            </span>
            <span onClick={handleLogout} className="link-btn">
              Log out
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
