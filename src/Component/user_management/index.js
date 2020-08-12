import React, {useState} from 'react';
import './style.scss';
import {Table, Button, Modal, Form, Row, Col} from 'react-bootstrap';
import {List_account} from '../../Component';

function User_Management() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div className="management-padding">
      <div className="body-management">
        <h2>USER MANAGEMENT</h2>
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
            <tr>
              <td>TRANDANSOCUTE</td>
              <td>TRAN DAN</td>
              <td>321733223</td>
              <td>TranDanCute@gmail.com</td>
              <td>
                <Button variant="primary" className="btn" onClick={handleShow}>
                  Edit
                </Button>
                <Button variant="danger" className="btn-account" onClick={handleShow2}>
                  All Account
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>PROFILE USER</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="2" className="padding-label">
                  Username
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    readOnly
                    defaultValue="TRANDANSOCUTE"
                    name="username"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2" className="padding-label">
                  Fullname
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    defaultValue="Tran Dan"
                    name="fullname"
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
                    defaultValue="321733223"
                    name="identifyId"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2" className="padding-label">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    readOnly
                    defaultValue="TranDanCute@gmail.com"
                    name="email"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="btn-close"
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="modal-account">
        <Modal show={show2} onHide={handleClose2} size="xl">
          <List_account isModal={true} handleClose={handleClose2} />
        </Modal>
        </div>
      </div>
    </div>
  );
}
export default User_Management;
