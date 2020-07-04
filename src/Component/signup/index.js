import React from "react";
import "./style.scss";

function Signup() {
  return (
    <div className="Login">
      <div className="top"></div>
      <h2 className="nexttop">Create your account</h2>
      <p class="description">
        Create an account to view and manage your bank account.
      </p>
      <form action="" method="POST" className="form-login">
        <div className="form-input">
          <label for="username" className="label">
            <span>
              <div>Email</div>
            </span>
          </label>
          <input type="email" id="email" name="email" className="input" />
        </div>
        <div className="form-input">
          <label for="username" className="label">
            <span>
              <div>Username</div>
            </span>
          </label>
          <input id="username" name="username" className="input" />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            <span>
              <div className="label-password">Password</div>
            </span>
          </label>
          <input type="password" id="password" name="password" class="input" />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            <span>
              <div className="label-password">Confirm password</div>
            </span>
          </label>
          <input type="password" id="confirmpassword" name="confirmpassword" class="input" />
        </div>
        <button type="submit" class="button-type">
          <div className="labelbutton">Create your account</div>
        </button>
        <p className="bottom">
          By creating an account you agree to our{" "}
          <a class="button-create-account" href="">
            Terms of Service
          </a>{" "}
          and{" "}
          <a class="button-create-account" href="">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}

export default Signup;
