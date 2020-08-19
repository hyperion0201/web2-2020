import React, { useState } from "react";
import "./style.scss";
import { changepassword } from "../../Redux/Action/userAction";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { toast } from "react-toastify";

function Change_password() {
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      oldPass: formData.get("oldPassword"),
      newPass: formData.get("newPassword"),
    };
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      setError(true);
      return;
    } else setError(false);
    changepassword(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Change password successfully");
          window.location.replace("/");
        }
      })
      .catch((err) => {
        toast.error("Change password unsuccessfully");
      });
  };
  return (
    <div className="change_password">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <img
            className="icon-change-password"
            src="/images/change-password-icon.svg"
            alt=""
          ></img>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              autoComplete="current-password"
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="current-password"
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            {error && (
              <p className="error">
                Confirm password does not match with password
              </p>
            )}
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className="group-btn"
            >
              <Grid item xs="6">
                <Button href="/" fullWidth variant="contained">
                  Back
                </Button>
              </Grid>
              <Grid item xs="6">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Change
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Change_password;
