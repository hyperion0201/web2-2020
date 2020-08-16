import React, { useState, useEffect } from "react";
import "./style.scss";
import { verifyUser, getUserInfo } from "../../Redux/Action/userAction";

import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import ReceiptIcon from '@material-ui/icons/Receipt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


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
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const [showProfile, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...showProfile, [anchor]: open });
  };

  return (
    <div>
      <React.Fragment key="left">
        <Button onClick={toggleDrawer("left", true)}>Profile</Button>
        <Drawer
          anchor="left"
          open={showProfile["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <div className="profile">
            <div className="list" role="presentation">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  {user.status === "verify" ? (
                    <img
                      className="icon-user"
                      src="/images/user-verify.svg"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      className="icon-user"
                      src="/images/user-unverify.svg"
                      alt=""
                    ></img>
                  )}
                </ListItem>
                <ListItem className="username">
                  <ListItemText primary={user.username} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.fullName} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BrandingWatermarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.identity_id} />
                </ListItem>
                <ListItemLink href="/account">
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItemLink>
                <ListItemLink href="/transaction">
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transaction" />
                </ListItemLink>
                <ListItemLink href="/transfer">
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transfer" />
                </ListItemLink>
                <ListItemLink href="/user/changePassword">
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change password" />
                </ListItemLink>
              </List>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Profile;
