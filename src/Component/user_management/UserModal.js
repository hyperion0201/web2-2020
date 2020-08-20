import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { get } from "lodash";

const UserModal = ({ show, onClose, onSave, selectedItem }) => {
  const [status, setStatus] = useState(selectedItem.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      status: status,
    };
    onSave(data);
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
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Identify Photo
            </Form.Label>
            <img
              className="img-identity"
              src={selectedItem.identity_image_url}
              alt=""
            ></img>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Status
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={(e) => setStatus(get(e, "target.value"))}
              >
                <option value="verified">verified</option>
                <option value="unverified">unverified</option>
              </Form.Control>
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
