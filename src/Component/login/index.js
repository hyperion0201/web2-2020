import React from "react";
import "./style.scss";

function Login() {
  return (
    <div className="Login">
      <h2 className="nexttop">Welcome back!</h2>
      <p class="description">
        Log in to access your dashboard, settings and Snacks.
      </p>
      <form action="" method="POST" className="form-login">
        <div className="form-input">
          <label for="username" className="label">
            <span>
              <div>Email or username</div>
            </span>
          </label>
          <input id="username" name="username" className="input" />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            <span>
              <div className="label-password">
                Password<a className="forgotpassword" href="#">Forgot password?</a>
              </div>
            </span>
          </label>
          <input type="password" id="password" name="password" class="input" />
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
