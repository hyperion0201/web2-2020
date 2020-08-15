import React, { useState, useEffect } from "react";
import "./style.scss";
import { Tabs, Tab, Table, Button } from "react-bootstrap";
import { getListAccount } from "../../Redux/Action/userAction";

function List_account({ isModal, handleClose }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getListAccount()
      .then((res) => {
        const listAccount = res.data;
        setAccounts(listAccount.accounts);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
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
                        <Button variant="primary">
                          View transaction history
                        </Button>
                      </td>
                      <td>{account.createdAt}</td>
                      {account.active === true ? (
                        <td>Active</td>
                      ) : (
                        <td>Block</td>
                      )}
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
                  <th className="order">#</th>
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
                  {account.account_type === "saving" ? (
                    <tr>
                      <td>{account.id}</td>
                      <td>{account.account_id}</td>
                      <td>{account.account_balance}</td>
                      <td>{account.createdAt}</td>
                      <td>{account.interest_rate}</td>
                      <td>1/2/2020</td>
                      {account.active === true ? (
                        <td>Active</td>
                      ) : (
                        <td>Block</td>
                      )}
                      <td>{account.term}</td>
                      <td>{account.maturity_date}</td>
                      <td className="bt-withdraw-money">
                        <Button variant="danger">Withdraw money</Button>
                      </td>
                    </tr>
                  ) : (
                    <div></div>
                  )}
                </tbody>
              ))}
            </Table>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default List_account;