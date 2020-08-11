import React from "react";
import "./style.scss";
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
        }
      })
      .catch((err) => {
        toast.error("Send fail");
      });
  };
  return (
    <form onSubmit={handleSubmit}> 
      <div className="form-input">
        <label for="email" className="label">
          Email
        </label>
        <input id="email" name="email" className="input" required />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ForgotPassword;
