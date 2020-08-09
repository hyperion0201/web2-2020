import React, { useState } from "react";
import "./style.scss";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Change_password() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    
  };
  return (
    <>
      <a variant="outline-primary" onClick={handleShow}>
        Change password
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Password old</Form.Label>
              <Form.Control type="password" placeholder="Password old" />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm New Password" />
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
