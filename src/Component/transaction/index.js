import React from 'react';
import './style.scss';
import { Table } from 'react-bootstrap';

function Transaction() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  const trans = [
    {
      id: '001',
      accountNo: Math.floor(1000 + Math.random() * (10000 - 1000)),
      moneyInto: 500 + '$',
      moneyOut: 0 + '$',
      time: dateTime,
      guestAccount: Math.floor(1000 + Math.random() * (10000 - 1000)),
      guestBank: 'TranDan Bank',
    },
    {
      id: '002',
      accountNo: Math.floor(1000 + Math.random() * (10000 - 1000)),
      moneyInto: 0 + '$',
      moneyOut: 200 + '$',
      time: dateTime,
      guestAccount: Math.floor(1000 + Math.random() * (10000 - 1000)),
      guestBank: 'TranDan Bank',
    },
    {
      id: '003',
      accountNo: Math.floor(1000 + Math.random() * (10000 - 1000)),
      moneyInto: 1000 + '$',
      moneyOut: 0 + '$',
      time: dateTime,
      guestAccount: Math.floor(1000 + Math.random() * (10000 - 1000)),
      guestBank: 'TranDan Bank',
    },
  ];
  return (
    <div className="transaction">
      <h2>TRANSACTION HISTORY</h2>
      <Table responsive striped bordered>
        <thead className="header-tab">
          <tr>
            <th>No</th>
            <th>Account Number</th>
            <th> Amount Of Money (+) </th>
            <th> Amount Of Money (-) </th>
            <th>Transaction Time </th>
            <th>From (To) Account</th>
            <th>From (To) Bank </th>
          </tr>
        </thead>
        {trans.map((tran) => (
          <tbody className="body">
            <tr>
              <th>{tran.id}</th>
              <th>{tran.accountNo}</th>
              <th>{tran.moneyInto}</th>
              <th>{tran.moneyOut}</th>
              <th>{tran.time}</th>
              <th>{tran.guestAccount}</th>
              <th>{tran.guestBank}</th>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}
export default Transaction;
