import React, {useState, useEffect} from 'react';
import './style.scss';
import {Tabs, Tab, Table, Button, Modal,Form} from 'react-bootstrap';
import {
  getListAccount,
  lockAccount,
  unlockAccount,
  getListAccountByStaff,
} from '../../Redux/Action/userAction';
import {get, filter} from 'lodash';
import TransactionHistory from '../transaction';
import {toast} from 'react-toastify';

function List_account({isModal, handleClose, selectedItem, isStaff}) {
  const [accounts, setAccounts] = useState([]);
  const [showTransHistory, setShowTransHistory] = useState(false);
  const [accountSelected, setAccountSelected] = useState();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const close = () => setShow(false);

  const [listAccount, setListAccount] = useState([]);
  useEffect(() => {
    getListAccount().then((res) => {
      if (res.error) return;
      const {data} = res;
      const list = (
        filter(
          get(data, 'accounts'),
          (item) => item.account_type !== 'saving'
        ) || []
      ).map((account) => account.account_id);
      setListAccount(list);
    });
  }, []);

  useEffect(() => {
    if (selectedItem && isStaff) {
      getAccountByStaff(selectedItem.id);
    } else handleGetListAccount();
  }, []);
  const getAccountByStaff = (id) => {
    getListAccountByStaff(id).then((res) => {
      if (res.error) return;
      const {data} = res;
      setAccounts(get(data, 'accounts'));
    });
  };
  const handleGetListAccount = () => {
    getListAccount().then((res) => {
      if (res.error) return;
      const {data} = res;
      setAccounts(get(data, 'accounts'));
    });
  };

  const handleShowTransHistory = (account) => {
    setShowTransHistory(true);
    setAccountSelected(account);
  };

  const handleLockAccount = (account_id) => {
    lockAccount({account_id})
      .then((res) => {
        if (res.status === 200) {
          toast.success('Lock account successfully');
          handleGetListAccount();
        }
      })
      .catch((err) => {});
  };
  const handleUnlockAccount = (account_id) => {
    unlockAccount({account_id})
      .then((res) => {
        if (res.status === 200) {
          toast.success('Unlock account successfully');
          handleGetListAccount();
        }
      })
      .catch((err) => {});
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
          {selectedItem ? `${selectedItem.fullName} accounts` : 'Your accounts'}
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
                  {account.account_type === 'spending' ? (
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
                      <td>{account.createdAt}</td>
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
                            {' '}
                            Lock{' '}
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
                  {account.account_type === 'saving' ? (
                    <tr>
                      <td>{account.id}</td>
                      <td>{account.account_id}</td>
                      <td>{account.account_balance}</td>
                      <td>{account.createdAt}</td>
                      <td>{account.interest_rate}</td>
                      <td>1/2/2020</td>
                      {account.active ? <td>Active</td> : <td>Block</td>}
                      <td>{account.term}</td>
                      <td>{account.maturity_date}</td>
                      {isStaff ? (
                        <td className="btn-withdraw-money">
                          <Button variant="danger">Active</Button>
                        </td>
                      ) : (
                        <td className="btn-withdraw-money">
                          <Button variant="danger" onClick={handleShow}>
                            Withdraw Money
                          </Button>
                        </td>
                      )}
                    </tr>
                  ) : (
                    <div></div>
                  )}
                  <Modal show={show} onHide={close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Choose your credit account</Modal.Title>
                    </Modal.Header>
                    <Form.Text className="text-muted">To withdraw money from saving account, you need to select one of the credit account. </Form.Text>

                    <Modal.Body>
                      <label for="acc-id" className="acc-id">
                        Account number
                      </label>
                      <select name="acc-id">
                        <option value={account.account_id}>
                          {account.account_id}
                        </option>
                      </select>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={close}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={close}>
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tbody>
              ))}
            </Table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default List_account;
