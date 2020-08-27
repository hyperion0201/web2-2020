import React, { useState } from "react";
import "./style.scss";
import { deposit, withdrawal } from "../../Redux/Action/paymentAction";
import { Drawer, Button, TextField, Typography, Grid } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { toast } from "react-toastify";
import { get } from "lodash";

function EditAccountSpending() {
  const [showEditAccount, setEditAccount] = useState(false);
  const [action, setAction] = useState();

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
    const dataDeposit = {
      account_id: formData.get("account_id"),
      amount: formData.get("amount"),
    };
    const dataWithdrawal = {
      spending_account_id: formData.get("account_id"),
      amount: formData.get("amount"),
    };
    if (action === "deposit") {
      deposit(dataDeposit).then((res) => {
        if (get(res, "data.error")) toast.error(get(res, "data.error.message"));
        else if (res.status === 200) {
          toast.success(get(res, "data.message"));
          window.location.replace("/user-management");
        }
      });
    } else {
      withdrawal(dataWithdrawal).then((res) => {
        if (get(res, "data.error")) toast.error(get(res, "data.error.message"));
        else if (res.status === 200) {
          toast.success(get(res, "data.message"));
          window.location.replace("/user-management");
        }
      });
    }
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
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="stretch"
                >
                  <ToggleButton
                    value="deposit"
                    id="deposit"
                    name="deposit"
                    className="btn-action"
                    onChange={(e) => setAction(e.currentTarget.value)}
                  >
                    Deposit
                  </ToggleButton>
                  <ToggleButton
                    value="withdrawal"
                    id="withdrawal"
                    name="withdrawal"
                    className="btn-action"
                    onChange={(e) => setAction(e.currentTarget.value)}
                  >
                    Withdrawal
                  </ToggleButton>
                </Grid>
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
