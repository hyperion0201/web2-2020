import React, { useState, useEffect } from "react";
import "./style.scss";
import { Tabs, Tab, Table, ButtonGroup, Button } from "react-bootstrap";
import { getListAccount } from "../../Redux/Action/userAction";

function List_account({isModal, handleClose}) {
  const [account, setAccount] = useState({
    id: null,
    account_id: "",
    active: true,
    transaction_history: {},
    account_balance: 0,
    currency: "",
    account_type: "",
    interest_rate: 0,
    maturity_date: null,
    term: 0,
    createdAt: "",
    updatedAt: "",
    userId: null,
  });
  useEffect(() => {
    getListAccount()
      .then((res) => {
        const listAccount = res.data;
        setAccount(listAccount.accounts);
        console.log("listAccount: ", listAccount);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  console.log("account", account);
  return (
    <div className="btn-close-form">
      {isModal && (
        <i className="material-icons" onClick={handleClose}>
          close
        </i>
      )}
    <div className="outermost">
      <h1>List of your bank accounts</h1>
      <Tabs>
        <Tab
          eventKey="credit-account"
          title="Credit account"
          className="tab-table"
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="order">#</th>
                <th>Account number</th>
                <th>Account balance</th>
                <th className="table-transaction">Transaction history</th>
                <th>Date created</th>
                <th>Status</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td>1</td>
                <td>123456789</td>
                <td>1000</td>
                <td>
                  <Button variant="primary">View transaction history</Button>
                </td>
                <td>30/1/2020</td>
                <td>Active</td>
                <td className="un-lock">
                  <Button variant="primary" className="btn">
                    Unlock
                  </Button>
                  <Button variant="danger" className="btn">
                    {" "}
                    Lock{" "}
                  </Button>
                </td>
              </tr>
            </tbody>
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
                <th className="order">#</th>
                <th>Account number</th>
                <th>Date created</th>
                <th>Date active</th>
                <th>Status</th>
                <th>Date due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>123456789</td>
                <td>30/1/2020</td>
                <td>1/2/2020</td>
                <td>active</td>
                <td>1/2/2021</td>
                <td className="bt-withdraw-money">
                  <Button variant="danger">Withdraw money</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
    </div>
  );
}

export default List_account;
