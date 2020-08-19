import React from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const UserModal = ({ show, onClose, onSave, selectedItem }) => {
  console.log("selectedItem: ", selectedItem);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Username
            </Form.Label>
            <Col sm="8">
              <Form.Control
                readOnly
                defaultValue={selectedItem.username}
                name="username"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Full Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                defaultValue={selectedItem.fullName}
                name="fullName"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Identify Id
            </Form.Label>
            <Col sm="8">
              <Form.Control
                readOnly
                defaultValue={selectedItem.identity_id}
                name="identifyId"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Email
            </Form.Label>
            <Col sm="8">
              <Form.Control defaultValue={selectedItem.email} name="email" />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} className="btn-close">
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserModal;
