import React from "react";
import "./style.scss";
import { getCookie, removeCookie } from "../../helpers/cookie";

function Header() {
  const isLogin = getCookie("user_token");
  
  const handleLogout = () => {
    removeCookie("user_token");
    window.location.reload();
  };
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
          <div onClick={handleLogout} className="link-btn">
            Log out
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
