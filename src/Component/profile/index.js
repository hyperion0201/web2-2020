import React, { useState } from "react";
import "./style.scss";
import { ListGroup, Button } from "react-bootstrap";
import Change_password from "../change_password";
import { getCookie, removeCookie } from "../../helpers/cookie";

function Profile() {
  const [user, setUser] = useState({
    fullName: "Thanh",
    email: "asd@sada",
    username: "danbalacaithuboibac",
    identify_id: "123456789",
    status: "unverify",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event: ", event);
    const data = new FormData(event.target);
  };
  return (
    <div className="profile">
      <div className="background text">
        <img
          src="/images/user-profile-icons.png"
          height="50%"
          width="50%"
          alt=""
        ></img>
        <h3>{user.username}</h3>
      </div>
      <ListGroup>
        <ListGroup.Item variant="primary">
          <b>Full name</b> : {user.fullName}
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <b>Email</b> : {user.email}
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <b>Identify ID</b> : {user.identify_id}
        </ListGroup.Item>
        <ListGroup.Item variant="primary">
          <b>Status</b> : {user.status}
          <label class="custom-file">
            <input type="file" id="file" class="custom-file-input"/>
          </label>
        </ListGroup.Item>
        <Change_password />
        <ListGroup.Item
          className="profile_btn_logout"
          type="button"
          variant="primary"
        >
          <img src="/images/logout.svg" height="10%" width="10%"></img>
          Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Profile;
