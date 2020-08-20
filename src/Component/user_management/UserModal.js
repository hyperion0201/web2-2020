import React from 'react';
import {Button, Modal, Form, Row, Col} from 'react-bootstrap';

const UserModal = ({show, onClose, onSave, selectedItem}) => {
  console.log('selectedItem: ', selectedItem);
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
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Identify Photo
            </Form.Label>
            <img className="img-identity"
              src="data:image/jpeg;base64,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"
              name="identity_image_url"
            ></img>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2" className="padding-label">
              Status
            </Form.Label>
            <Col sm="8">
              <Form.Control as="select" name="status" id="status">
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
