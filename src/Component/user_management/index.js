import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import { Table, Button, Modal } from "react-bootstrap";
import { List_account as ListAccount } from "../../Component";
import { TextField } from "@material-ui/core";
import UserModal from "./UserModal";
import { getAllUser, editUser } from "../../Redux/Action/userAction";
import { get, debounce } from "lodash";
import { toast } from "react-toastify";

function User_Management() {
  const [listUser, setListUser] = useState();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showManageAccount, setShowManageAccount] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchKey, setSearchKey] = useState({});

  useEffect(() => {
    debounceGetUser();
  }, [searchKey]);

  const debounceGetUser = useCallback(
    debounce(() => {
      getAllUser(searchKey).then((res) => {
        res.status === 200 && setListUser(res.data);
      });
    }, 500),
    [searchKey]
  );

  const onChangeSearchBox = (key, value) => {
    setSearchKey({ ...searchKey, [key]: value });
  };

  const closeUserModal = () => setShowUserProfile(false);

  const onShowUserModal = (user) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleEditUser = (data) => {
    editUser({ data, id: selectedUser.id })
      .then((res) => {
        toast.success(res.message);
        setShowUserProfile(false);
        debounceGetUser();
      })
      .catch((err) => {
        toast.error(get(err, "response.data.error", "Something went wrong"));
      });
  };

  const closeManageAccount = () => setShowManageAccount(false);

  const handleShowManageAccount = (user) => {
    setSelectedUser(user);
    setShowManageAccount(true);
  };
  return (
    <div className="management-padding">
      <div className="body-management">
        <h2>USER MANAGEMENT</h2>
        <div className="search-box">
          <p className="title">Search by: </p>
          <TextField
            variant="outlined"
            margin="normal"
            label="Username"
            name="username"
            value={searchKey.username}
            onChange={(e) => onChangeSearchBox("username", e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Identify ID"
            name="identity_id"
            value={searchKey.identity_id}
            onChange={(e) => onChangeSearchBox("identity_id", e.target.value)}
          />
        </div>
        <Table responsive striped bordered>
          <thead className="header-tab">
            <tr>
              <th>USERNAME</th>
              <th>FULL NAME</th>
              <th>IDENTIFY ID</th>
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="body">
            {(listUser || []).map((item) => (
              <tr>
                <td>{item.username}</td>
                <td>{item.fullName}</td>
                <td>{item.identity_id}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="primary"
                    className="btn"
                    onClick={() => onShowUserModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-account"
                    onClick={() => handleShowManageAccount(item)}
                  >
                    User Accounts
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showUserProfile && (
          <UserModal
            show={showUserProfile}
            onClose={closeUserModal}
            onSave={handleEditUser}
            selectedItem={selectedUser}
          />
        )}
        <div className="modal-account">
          <Modal show={showManageAccount} onHide={closeManageAccount} size="xl">
            <ListAccount
              isModal={true}
              handleClose={closeManageAccount}
              selectedItem={selectedUser}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default User_Management;
