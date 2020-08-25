import React, { useState } from "react";
import "./style.scss";
import { deposit } from "../../Redux/Action/paymentAction";
import { Drawer, Button, TextField, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import { get } from "lodash";

function EditAccountSpending() {
  const [showEditAccount, setEditAccount] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setEditAccount({ ...showEditAccount, [anchor]: open });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      account_id: formData.get("account_id"),
      amount: formData.get("amount"),
    };
    deposit(data).then((res) => {
      if (get(res, "data.error")) toast.error(get(res, "data.error.message"));
      else if (res.status === 200) {
        toast.success(get(res, "data.message"));
        window.location.replace("/user-management");
      }
    });
  };

  return (
    <div>
      <React.Fragment key="top">
        <Button onClick={toggleDrawer("top", true)}>
          Edit account spending
        </Button>
        <Drawer
          anchor="top"
          open={showEditAccount["top"]}
          onClose={toggleDrawer("top", false)}
        >
          <div className="editAccount">
            <div className="list" role="presentation">
              <Typography component="h1" variant="h5">
                Deposit
              </Typography>
              <form onSubmit={handleSubmit} className="form">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="account_id"
                  label="Account ID"
                  name="account_id"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default EditAccountSpending;
