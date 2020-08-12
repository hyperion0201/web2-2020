import React, { useState, useEffect } from "react";
import "./style.scss";
import { ListGroup, Button } from "react-bootstrap";
import ChangePassword from "../change_password";
import { verifyUser, getUserInfo } from "../../Redux/Action/userAction";

function Profile() {
  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    fullName: "",
    password: "",
    status: "",
    identity_type: "",
    identity_id: "",
    identity_image_url: null,
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        const persons = res.data;
        setUser(persons.user);
        console.log('persons: ', persons);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  console.log('user: ', user);

  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event: ", event);
    const data = new FormData(event.target);
  };
  const handleCloseProfile = () => {
    let profile = document.getElementById("profileRef");
    profile && profile.classList.remove("show-profile");
  };

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileSource = fileReader.result;
      setFileUpload({
        file: file,
        fileName: file.name,
        type: "IMAGE",
        fileSource,
      });
    };

    fileReader.readAsDataURL(file);
  };
  const verifyAccount = () => {
    if (!fileUpload) return;
    verifyUser({ identify: fileUpload.fileSource })
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div id="profileRef" className="profile">
      <button className="close" onClick={handleCloseProfile}>
        Close
      </button>
      <div className="background text">
        <img
          src="/images/user-profile-icons.png"
          height="50%"
          width="50%"
          alt=""
        ></img>
        <h3>{user.username}</h3>
      </div>
      <ListGroup className="bg-c">
        <ListGroup.Item className="bg-c">
          <b>Full name</b> : {user.fullName}
        </ListGroup.Item>
        <ListGroup.Item className="bg-c">
          <b>Email</b> : {user.email}
        </ListGroup.Item>
        <ListGroup.Item className="bg-c">
          <b>Identify ID</b> : {user.identity_id}
        </ListGroup.Item>
        <ListGroup.Item className="bg-c">
          <b>Status</b> : {user.status}
          {fileUpload && (
            <img
              src={fileUpload.fileSource}
              height={60}
              width={60}
              alt={fileUpload.file.name}
            />
          )}
          {fileUpload && (
            <button className="btn-primary" onClick={verifyAccount}>
              Verify account
            </button>
          )}
          <label class="custom-file">
            Choose image...
            <input
              type="file"
              accept=".jpeg,.jpg,.png"
              hidden
              onChange={onUploadImage}
            />
          </label>
        </ListGroup.Item>
        <ChangePassword />
        <ListGroup.Item className="profile_btn_logout" type="button">
          <img src="/images/logout.svg" className="profile-icon" alt=""></img>
          Log out
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Profile;
