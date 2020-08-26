import React, { useRef, useEffect, useState } from "react";
import "./style.scss";
import { getCookie, removeCookie } from "../../helpers/cookie";
import Profile from "../profile";
import EditAccountSpending from "../EditAccountSpending";
import { get } from "lodash";
import { getUserInfo } from "../../Redux/Action/userAction";

const Header = () => {
  const [user, setUser] = useState({});
  const headerRef = useRef();

  const isLogin = getCookie("user_token");
  const pathname = get(window, "location.pathname");

  useEffect(() => {
    getUserInfo().then((res) => {
      const { data } = res;
      data && setUser(data.user);
    });
    if (["/login", "/register"].includes(pathname)) {
      headerRef.current.classList.add("transparent-header");
    } else {
      headerRef.current.classList.remove("transparent-header");
    }
  }, [pathname]);

  const handleLogout = () => {
    removeCookie("user_token");
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div ref={headerRef} className="header">
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
              {user && user.role === "staff" && (
                <a href="/user-management" className="link-btn">
                  User Management
                </a>
              )}
              {user && user.role === "staff" && <EditAccountSpending />}
              {user && user.role !== "staff" && (
                <a href="/account" className="link-btn">
                  List accounts
                </a>
              )}
              {user && user.role !== "staff" && (
                <a href="/transfer" className="link-btn">
                  Transfer
                </a>
              )}
              <Profile />
              <span onClick={handleLogout} className="link-btn">
                Log out
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
