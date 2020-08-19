import React from "react";
import "./style.scss";
import { TextField, Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { forgotpassword } from "../../Redux/Action/userAction";
import { toast } from "react-toastify";

function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
    };
    forgotpassword(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Send successfully");
          window.location.replace("/login");
        }
      })
      .catch((err) => {
        toast.error("Send fail");
      });
  };
  return (
    <div className="main-forget">
      <div className="header-forget">
        <h1>Forgot your password?</h1>
        <hr></hr>
        <h2>Enter your email address to reset your password</h2>
      </div>
      <div className="content-forget">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-submit">
            <TextField
              className="form-input"
              variant="standard"
              margin="normal"
              required
              fullWidth
              type="email"
              name="email"
              label="Enter your email address"
              id="email"
              autoFocus
            />
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                type="submit"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
