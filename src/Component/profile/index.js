import React, {useState} from "react";
import "./style.scss";
import { Form } from "react-bootstrap";
import Change_password from "../change_password";

function Profile() {
  const [user, setUser] = useState({
    fullName: "Thanh",
    email: "asd@sada",
    username: "dasdsa"
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('event: ', event);
    const data = new FormData(event.target);
    
  }
  return (
    <div className="profile center">
      <div className="background pa">
        <img
          src="/images/user-profile-icons.png"
          height="50%"
          width="50%"
          alt=""
        ></img>
        <h3>User Name</h3>
      </div>
      <ul className="baimfor">
        <li className="imp">
          <span>Full name:</span>
        </li>
        <li className="imp">
          <span>Email:</span>
        </li>
        <li className="imp">
          <span>Identity ID:</span>
        </li>
        <li className="imp">
          <Change_password/>
        </li>
        <li className="imp">
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
