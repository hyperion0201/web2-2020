import React, { useState, useEffect } from "react";
import "./style.scss";
import { Tabs, Tab, Table, Button, Modal, Form } from "react-bootstrap";
import {
  getListAccount,
  lockAccount,
  unlockAccount,
  getListAccountByStaff,
  updateAccountByStaff,
} from "../../Redux/Action/userAction";
import { deposit } from "../../Redux/Action/paymentAction";
import { get, filter } from "lodash";
import TransactionHistory from "../transaction";
import { toast } from "react-toastify";
import { withdrawMoneySaving } from "../../Redux/Action/paymentAction";

function List_account({ isModal, handleClose, selectedItem, isStaff }) {
  const [accounts, setAccounts] = useState([]);
  const [showTransHistory, setShowTransHistory] = useState(false);
  const [accountSelected, setAccountSelected] = useState();
  const [desAccount, setDesAccount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = (account) => {
    setAccountSelected(account);
    setShow(true);
  };
  const close = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleShow2 = (account) => {
    setAccountSelected(account);
    setShow2(true);
  };
  const close2 = () => setShow2(false);

  useEffect(() => {
    if (selectedItem && isStaff) {
      getAccountByStaff(selectedItem.id);
    } else handleGetListAccount();
  }, []);
  const getAccountByStaff = (id) => {
    getListAccountByStaff(id).then((res) => {
      if (res.error) return;
      const { data } = res;
      setAccounts(get(data, "accounts"));
      const temp = filter(
        data.accounts,
        (acc) => acc.account_type === "spending"
      );
      setDesAccount(get(temp[0], "account_id"));
    });
  };
  const handleGetListAccount = () => {
    getListAccount().then((res) => {
      if (res.error) return;
      const { data } = res;
      setAccounts(get(data, "accounts"));
      const temp = filter(
        data.accounts,
        (acc) => acc.account_type === "spending"
      );
      setDesAccount(get(temp[0], "account_id"));
    });
  };

  const handleShowTransHistory = (account) => {
    setShowTransHistory(true);
    setAccountSelected(account);
  };

  const handleLockAccount = (account_id) => {
    lockAccount({ account_id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Lock account successfully");
          handleGetListAccount();
        }
      })
      .catch((err) => {});
  };
  const handleUnlockAccount = (account_id) => {
    unlockAccount({ account_id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Unlock account successfully");
          handleGetListAccount();
        }
      })
      .catch((err) => {});
  };

  const onWithdrawMoney = () => {
    withdrawMoneySaving({
      des_account_id: desAccount,
      sav_account_id: accountSelected.account_id,
    })
      .then((res) => {
        setShow(false);
        handleGetListAccount();
      })
      .catch((err) => {
        toast.error(get(err, "response.data.error"));
      });
  };

  const savingactive = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      maturity_date: formData.get("due-date"),
      active: true,
    };
    const amount = {
      account_id: accountSelected.account_id,
      amount: formData.get("amount"),
    };
    updateAccountByStaff(data, accountSelected.account_id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Success");
        }
      })
      .catch((err) => toast.error("Error"));
    deposit(amount).then((res) => {
      if (get(res, "data.error")) toast.error(get(res, "data.error.message"));
      else if (res.status === 200) {
        toast.success(get(res, "data.message"));
        close2();
        getAccountByStaff(selectedItem.id);
      }
    });
  };

  const onChangeDesAccount = (e) => {
    setDesAccount(e.target.value);
  };

  return (
    <>
      {isModal && (
        <div className="btn-close-form">
          <i className="material-icons" onClick={handleClose}>
            close
          </i>
        </div>
      )}
      <Modal
        show={showTransHistory}
        onHide={() => setShowTransHistory(false)}
        size="xl"
      >
        <TransactionHistory accountSelected={accountSelected} />
      </Modal>
      <div className="outermost">
        <h1>
          {selectedItem ? `${selectedItem.fullName} accounts` : "Your accounts"}
        </h1>
        <Tabs>
          <Tab
            eventKey="credit-account"
            title="Credit account"
            className="tab-table"
          >
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="order">No.</th>
                  <th>Account number</th>
                  <th>Account balance</th>
                  <th className="table-transaction">Transaction history</th>
                  <th>Date created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {accounts.map((account) => (
                <tbody>
                  {account.account_type === "spending" ? (
                    <tr>
                      <td>{account.id}</td>
                      <td>{account.account_id}</td>
                      <td>{account.account_balance}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleShowTransHistory(account)}
                        >
                          View transaction history
                        </Button>
                      </td>
                      <td>{new Date(account.createdAt).toLocaleString()}</td>
                      {account.active ? <td>Active</td> : <td>Block</td>}
                      <td className="un-lock">
                        {account.active ? (
                          <Button
                            variant="danger"
                            className="btn"
                            onClick={() =>
                              handleLockAccount(account.account_id)
                            }
                          >
                            {" "}
                            Lock{" "}
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className="btn"
                            onClick={() =>
                              handleUnlockAccount(account.account_id)
                            }
                          >
                            Unlock
                          </Button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <div></div>
                  )}
                </tbody>
              ))}
            </Table>
          </Tab>
          <Tab
            eventKey="saving-account"
            title="Saving account"
            className="tab-table"
          >
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="order">No.</th>
                  <th>Account number</th>
                  <th>Account balance</th>
                  <th>Date created</th>
                  <th>Interest rate</th>
                  <th>Date active</th>
                  <th>Status</th>
                  <th>Term</th>
                  <th>Date due</th>
                </tr>
              </thead>
              {accounts.map((account) => (
                <tbody>
                  {account.account_type === "saving" && (
                    <tr>
                      <td>{account.id}</td>
                      <td>{account.account_id}</td>
                      <td>{account.account_balance}</td>
                      <td>{new Date(account.createdAt).toLocaleString()}</td>
                      <td>{account.interest_rate}</td>
                      <td>{new Date(account.active_date).toLocaleString()}</td>
                      {account.active ? <td>Active</td> : <td>Block</td>}
                      <td>{account.term}</td>
                      <td>
                        {new Date(account.maturity_date).toLocaleString()}
                      </td>
                      {isStaff ? (
                        !account.active && (
                          <td className="btn-withdraw-money">
                            <Button
                              variant="danger"
                              onClick={() => handleShow2(account)}
                            >
                              Active
                            </Button>
                          </td>
                        )
                      ) : (
                        <td className="btn-withdraw-money">
                          <Button
                            variant="danger"
                            onClick={() => handleShow(account)}
                          >
                            Withdraw Money
                          </Button>
                        </td>
                      )}
                    </tr>
                  )}
                </tbody>
              ))}
              <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                  <Modal.Title>Choose your credit account</Modal.Title>
                </Modal.Header>
                <small>
                  <Form.Text className="text-muted">
                    To withdraw money from saving account, you need to select
                    one of the credit account.{" "}
                  </Form.Text>
                </small>
                <Modal.Body>
                  <label for="des_account_id" className="acc-id">
                    Account number
                  </label>
                  <select
                    name="des_account_id-id"
                    value={desAccount}
                    onChange={onChangeDesAccount}
                  >
                    {accounts.map(
                      (account) =>
                        account.account_type === "spending" && (
                          <option value={account.account_id}>
                            {account.account_id}
                          </option>
                        )
                    )}
                  </select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={close}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onWithdrawMoney}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={show2} onHide={close2}>
                <Modal.Header closeButton>
                  <Modal.Title>Saving Account</Modal.Title>
                </Modal.Header>
                <small>
                  <Form.Text className="text-muted">
                    Please select interest rate and due date.
                  </Form.Text>
                </small>
                <form onSubmit={savingactive}>
                  <Modal.Body>
                    <div className="sv-modal">
                      <label for="interest-rate">Interest rate :</label>
                      <select name="interest-rate" className="item-sv">
                        <option value={0.5} selected>
                          Unlimited
                        </option>
                        <option value={1.5}>1 Year</option>
                        <option value={2}>2 Years</option>
                        <option value={2.5}>3 Years</option>
                        <option value={3.5}>6 Years</option>
                        <option value={4.5}>9 Years</option>
                        <option value={6}>12 Years</option>
                      </select>
                    </div>
                    <div className="sv-modal">
                      <label for="due-date">Due date :</label>
                      <input
                        type="date"
                        name="due-date"
                        className="item-sv2"
                      ></input>
                    </div>
                    <div className="sv-modal">
                      <label for="amount">Amount :</label>
                      <input name="amount" className="item-sv3"></input>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={close2}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </Table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default List_account;
