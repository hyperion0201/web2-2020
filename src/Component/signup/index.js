import React, { useState } from "react";
import "./style.scss";
import { register } from "../../Redux/Action/userAction";
import { toast } from "react-toastify";
import {
  Select,
  MenuItem,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { get } from "lodash";

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
      identity_type: formData.get("identity_type"),
      identity_id: formData.get("identity_id"),
      identity_issued_date: formData.get("identity_issued_date"),
    };
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError(true);
      return;
    } else setError(false);

    register(data).then((res) => {
      if (get(res, "data.error")) toast.error(get(res, "data.error"));
      else if (res.status === 200) {
        toast.success(
          "Create account successfully. Please check email to active your account"
        );
      }
    });
  };
  return (
    <div className="sign-up-form">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
           
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
            <div className="identity-field">
              <Grid item xs="3">
                <FormControl variant="outlined" className="type-identity">
                  <InputLabel id="identity_type">Type</InputLabel>
                  <Select id="identity_type" label="Type" name="identity_type">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="cmnd">CMND</MenuItem>
                    <MenuItem value="cccd">CCCD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="5">
              <div className="identity-id-field">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="identity_id"
                  label="Identity ID"
                  name="identity_id"
                />
                </div>
              </Grid>
              <Grid item xs="4">
              <div className="identity-id-field">

                <TextField
                  id="identity_issued_date"
                  label="Date of issue"
                  name="identity_issued_date"
                  type="date"
                  className="identity_issued_date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </div>
              </Grid>
              </div>
            </Grid>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            {error && (
              <p className="error">
                Confirm password does not match with password
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
