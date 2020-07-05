import React from "react";
import "./style.scss";

function Header(props) {
    
  return (
    <div className="header">
      <div className="nav-bar">
        <p>VNBC Bank</p>
        <div className="link-group">
          <a href="/login" className="link-btn">
            Log in
          </a>
          <a href="/register" className="link-btn sign-up">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
