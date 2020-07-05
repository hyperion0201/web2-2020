import React, { useState } from "react";
import "./style.scss";
import { login } from "../../Redux/Action/userAction";
import _ from "lodash";
import { setCookie } from "../../helpers/cookie";
import { toast } from "react-toastify";

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
    <div className="Login">
      <h2 className="nexttop">Welcome back!</h2>
      <p class="description">
        Log in to access your dashboard, settings and Snacks.
      </p>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="form-input">
          <label for="username" className="label">
            Email or Username
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
        <button type="submit" class="button-type">
          <div className="labelbutton">Log in</div>
        </button>
        <p className="bottom">
          Create account?{" "}
          <a class="button-create-account" href="/register">
            Create an account
          </a>
          .
        </p>
      </form>
    </div>
  );
}

export default Login;
