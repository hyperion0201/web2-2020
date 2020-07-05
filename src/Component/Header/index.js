import React from "react";
import "./style.scss";

function Header(props) {
    
  return (
    <div className="header">
      <div className="nav-bar">
        <p>VNBC Bank</p>
        <div className="btn-group">
          <a href="/login" className="link-btn">
            Log in
          </a>
          <a href="/sign-up" className="link-btn sign-up">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
