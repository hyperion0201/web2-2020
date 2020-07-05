import React, { useState } from "react";
import "./style.scss";
import { register } from "../../Redux/Action/userAction";

function Signup() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      identify_type: formData.get("identify_type"),
      identity_id: formData.get("identity_id"),
    };
    register(data)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div className="Login">
      <h2 className="nexttop">Create your account</h2>
      <p class="description">
        Create an account to view and manage your bank account.
      </p>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="form-input">
          <label for="fullName" class="label">
            Full Name
          </label>
          <input type="text" id="fullName" name="fullName" class="input" />
        </div>
        <div className="form-input">
          <label for="email" className="label">
            Email
          </label>
          <input type="email" id="email" name="email" className="input" />
        </div>
        <div className="form-input">
          <label for="username" className="label">
            Username
          </label>
          <input id="username" name="username" className="input" />
        </div>
        <div className="form-input">
          <label for="identify_type" class="label">
            Identify Type
          </label>
          <input
            type="text"
            id="identify_type"
            name="identify_type"
            class="input"
          />
        </div>
        <div className="form-input">
          <label for="identity_id" class="label">
            Identity ID
          </label>
          <input
            type="text"
            id="identity_id"
            name="identity_id"
            class="input"
          />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            Password
          </label>
          <input type="password" id="password" name="password" class="input" />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            class="input"
          />
        </div>
        <button type="submit" class="button-type">
          <div className="labelbutton">Create your account</div>
        </button>
      </form>
    </div>
  );
}

export default Signup;
