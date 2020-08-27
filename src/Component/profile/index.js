import React, { useState, useEffect } from "react";
import "./style.scss";
import { verifyUser, getUserInfo } from "../../Redux/Action/userAction";
import { get } from "lodash";
import { toast } from "react-toastify";
import {
  Grid,
  Drawer,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  List,
  Fade,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import SendIcon from "@material-ui/icons/Send";
import EmailIcon from "@material-ui/icons/Email";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";

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
    getUserInfo().then((res) => {
      const persons = res.data;
      setUser(persons.user);
    });
  }, []);

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
                  {user.status === "verified" ? (
                    <img
                      className="icon-user"
                      src="/images/user-verify.svg"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      className="icon-user"
                      src="/images/user-unverified.svg"
                      alt=""
                    ></img>
                  )}
                </ListItem>
                <ListItem className="username">
                  <ListItemText primary={user.username} />
                </ListItem>
                {user.status === "unverified" && (
                  <ListItem className="username">
                    <p>Your account is not activated yet</p>
                    {user.identity_image_url === null && (
                      <p>Please upload your ID photo to activate.</p>
                    )}
                  </ListItem>
                )}
                {user.status === "banned" && (
                  <ListItem className="notify-banned">
                    <p>Your account is being banned.</p>
                  </ListItem>
                )}

                {user.status === "unverified" &&
                  user.identity_image_url === null && <ModalUpload />}
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

const ModalUpload = () => {
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };
  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
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
    verifyUser({ identity: fileUpload })
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        return toast.error(
          get(err, "response.statusText") || "Something went wrong"
        );
      });
  };
  return (
    <div>
      <ListItem button onClick={handleOpenModal}>
        <ListItemIcon>
          <AddAPhotoIcon />
        </ListItemIcon>
        <ListItemText primary="Upload photo" />
      </ListItem>

      <Modal className="modal-upload" open={modal} onClose={handleCloseModal}>
        <Fade in={modal}>
          <div className="paper">
            <h2>Upload identification photo</h2>
            <Grid>
              <Grid item xs={12}>
                {fileUpload && (
                  <img
                    src={fileUpload.fileSource}
                    height="50%"
                    width="50%"
                    alt={fileUpload.file.name}
                  />
                )}
              </Grid>

              {fileUpload && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={verifyAccount}
                  startIcon={<SendIcon />}
                  className="btn"
                >
                  Verify account
                </Button>
              )}
              <input
                accept="image/*"
                hidden
                id="contained-button-file"
                multiple
                type="file"
                onChange={onUploadImage}
              />

              <label htmlFor="contained-button-file">
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  component="span"
                  className="btn"
                >
                  Choose image ...
                </Button>
              </label>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Profile;
