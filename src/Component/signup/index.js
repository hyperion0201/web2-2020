import React, { useState } from "react";
import "./style.scss";
import { register } from "../../Redux/Action/userAction";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Signup() {
  const [error, setError] = useState(false);

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
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError(true);
      return;
    } else setError(false);
    register(data)
      .then((res) => {
        if (res.status === 200) toast.success("🦄 Create account successfully");
      })
      .catch((err) => {
        toast.error("Fail! Please check again to make sure yore field correct");
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
          <input
            type="text"
            id="fullName"
            name="fullName"
            class="input"
            required
          />
        </div>
        <div className="form-input">
          <label for="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            required
          />
        </div>
        <div className="form-input">
          <label for="username" className="label">
            Username
          </label>
          <input id="username" name="username" className="input" required />
        </div>
        <div className="form-input">
          <label for="identify_type" class="label">
            Identify Type
          </label>
          <select
            type="text"
            id="identify_type"
            name="identify_type"
            class="input"
            required
          >
            <option value="cmnd">Chứng minh nhân dân.</option>
            <option value="cccd">Căn cước công dân</option>
          </select>
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
            required
          />
        </div>
        <div className="form-input">
          <label for="password" class="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="input"
            required
          />
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
            required
          />
        </div>
        {error && (
          <p className="error">Confirm password does not match with password</p>
        )}
        <Button variant="primary" type="submit">Create your account</Button>
      </form>
    </div>
  );
}

export default Signup;