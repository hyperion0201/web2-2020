import React from "react";
import "./style.scss";
import { Tabs, Tab, Table, ButtonGroup, Button } from "react-bootstrap";

function List_account() {
  return (
    <div className="outermost">
      <h1>List of your bank accounts</h1>
      <Tabs>
        <Tab eventKey="credit-account" title="Credit account">
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
                  <Button variant="primary">Unlock</Button>
                  <Button variant="danger">Lock</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="saving-account" title="Saving account">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
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
  );
}

export default List_account;
