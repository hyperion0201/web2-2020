import React, { useState, useEffect } from "react";
import "./style.scss";
import { Table } from "react-bootstrap";
import { getListTransaction } from "../../Redux/Action/paymentAction";
import { get } from "lodash";

function Transaction({ accountSelected }) {
  const [listTransaction, setListTransaction] = useState([]);

  useEffect(() => {
    if (accountSelected) {
      getListTransaction(accountSelected.account_id).then((res) => {
        console.log("res: ", res);
        if (res.status === 200) {
          setListTransaction(get(res, "data.data"));
        }
      });
    }
  }, [accountSelected]);

  console.log("listTransaction: ", listTransaction);
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  const trans = [
    {
      id: "001",
      accountNo: Math.floor(1000 + Math.random() * (10000 - 1000)),
      moneyInto: 500 + "$",
      moneyOut: 0 + "$",
      time: dateTime,
      guestAccount: Math.floor(1000 + Math.random() * (10000 - 1000)),
      guestBank: "TranDan Bank",
    },
    {
      id: "002",
      accountNo: Math.floor(1000 + Math.random() * (10000 - 1000)),
      moneyInto: 0 + "$",
      moneyOut: 200 + "$",
      time: dateTime,
      guestAccount: Math.floor(1000 + Math.random() * (10000 - 1000)),
      guestBank: "TranDan Bank",
    },
  ];
  return (
    <div className="transaction">
      <h2>TRANSACTION HISTORY</h2>
      <Table responsive striped bordered>
        <thead className="header-tab">
          <tr>
            <th>No</th>
            <th>Action</th>
            <th>Amount Of Money</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Exchange with</th>
            <th>Message</th>
          </tr>
        </thead>
        {listTransaction.map((tran, i) => (
          <tbody key={`${tran.deposit_account_id}-${i}`} className="body">
            <tr>
              <th>{i}</th>
              <th className="action">{tran.action}</th>
              <th>{tran.amount}</th>
              <th>{tran.date}</th>
              <th>{tran.deposit_account_id}</th>
              <th>{tran.receive_account_id}</th>
              <th>{tran.receive_name || tran.deposit_name}</th>
              <th>{tran.message}</th>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}
export default Transaction;
