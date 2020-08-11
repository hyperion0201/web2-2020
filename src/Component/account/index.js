import React, { useState } from "react";
import "./style.scss";
import { Button, Modal, ButtonGroup, ToggleButton } from "react-bootstrap";
import { toast } from "react-toastify";

function Account() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    toast.success("🦄 Create bank account successfully!");
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Bank Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose an account type to create </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <ButtonGroup toggle className="mb-3" aria-required>
              <ToggleButton
                type="checkbox"
                defaultChecked
                value="1"
                name="spending"
                id="spending"
                className="label-name"
              >
                Spending Account
              </ToggleButton>
              <br></br>
              <ToggleButton
                type="checkbox"
                value="2"
                name="saving"
                id="saving"
                className="label-name"
              >
                Saving Account
              </ToggleButton>
            </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Account;