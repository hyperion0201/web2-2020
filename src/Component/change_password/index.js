import React, { useState } from "react";
import "./style.scss";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { changepassword } from "../../Redux/Action/paymentAction";
import _ from "lodash";
import { setCookie } from "../../helpers/cookie";
import { toast } from "react-toastify";

function Change_password() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      oldPass: formData.get("oldPassword"),
      newPass: formData.get("newPassword"),
    };
    if (formData.get("oldPassword") !== formData.get("confirmPassword")) {
      setError(true);
      return;
    } else setError(false);
    changepassword(data)
      .then((res) => {
        if (res.status === 200) {
          const token = _.get(res, "data.token");
          setCookie("user_token", token);
          handleClose();
          toast.success("Change password successfully");
        }
      })
      .catch((err) => {
        toast.error("Change password fail");
      });
  };
  return (
    <>
      <ListGroup.Item
        className="btn_changepassword"
        type="button"
        onClick={handleShow}
      >
        <img src="/images/changepassword.svg" height="10%" width="10%"></img>
        Change password
      </ListGroup.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body className="change-password-modal">
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                id="oldPassword"
                name="oldPassword"
                type="password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                id="newPassword"
                name="newPassword"
                type="password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Change
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Change_password;
