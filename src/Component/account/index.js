import React, { useState } from "react";
import "./style.scss";
import {
  Button,
  Modal,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { createAccount } from "../../Redux/Action/paymentAction";
function Account() {
  const [show, setShow] = useState(false);
  const [type, setAccountType] = useState("spending");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      currency: formData.get("currency"),
      account_type: type,
    };
    createAccount(data)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          toast.success("Create bank account successfully!");
        }
      })
      .catch((err) => {
        handleClose();
        toast.error("Create account unsuccessfully");
      });
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
                value="spending"
                name="spending"
                id="spending"
                className="label-name"
                onChange={(e) => setAccountType(e.currentTarget.value)}
              >
                Spending Account
              </ToggleButton>
              <br></br>
              <ToggleButton
                type="checkbox"
                value="saving"
                name="saving"
                id="saving"
                className="label-name"
                onChange={(e) => setAccountType(e.currentTarget.value)}
              >
                Saving Account
              </ToggleButton>
            </ButtonGroup>
            <Form.Label
              className="my-1 mr-2 text-center"
              htmlFor="inlineFormCustomSelectPref"
            >
              <b>Currency</b>
            </Form.Label>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              name="currency"
              custom
            >
              <option value="VND">VND</option>
              <option value="USD">USD</option>
            </Form.Control>
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
