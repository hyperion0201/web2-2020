import React from "react";
import "./style.scss";
import CreateAccount from "../account";
import { getCookie } from "../../helpers/cookie";

function Homepage() {
  const isLogin = getCookie("user_token");
  return (
    <div className="container homepage">
      <div className="content">
        <img src="/images/frame.png" alt="" />
        {isLogin ? (
          <CreateAccount />
        ) : (
          <div>Please log in to use our service</div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
