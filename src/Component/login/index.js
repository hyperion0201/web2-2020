import React, { useState } from "react";
import "./style.scss";
import { login } from "../../Redux/Action/userAction";
import _ from "lodash";
import { setCookie } from "../../helpers/cookie";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    login(data)
      .then((res) => {
        if (res.status === 200) {
          const token = _.get(res, "data.token");
          setCookie("user_token", token);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        toast.error("Email/Username or Password is incorrect");
      });
  };
  return (
    <div className="container homepage">
      <div className="content">
        <img src="/images/frame.png" alt="" />
        <div>
          <h2 className="nexttop">Welcome back!</h2>
          <p class="description">Log in to manage your account.</p>
          <form onSubmit={handleSubmit} className="form-login">
            <div className="form-input">
              <label for="username" className="label">
                Username
              </label>
              <input id="username" name="username" className="input" required />
            </div>
            <div className="form-input">
              <label for="password" class="label">
                <span>
                  <div className="label-password">
                    Password
                    <a className="forgotpassword" href="#">
                      Forgot password?
                    </a>
                  </div>
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="input"
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <p className="bottom">
              Create account?{" "}
              <a class="button-create-account" href="/register">
                Create an account
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
