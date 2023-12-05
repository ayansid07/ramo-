// Repayments.jsx

import React, { useState } from "react";
import { Modal, Button, Form, Table, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Repayments = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    loanId: "",
    paymentDate: new Date(),
    dueDate: new Date(),
    principalAmount: 0,
    interest: 0,
    latePenalties: 0,
    totalAmount: 0,
  });
  const [repaymentsData, setRepaymentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      loanId: "",
      paymentDate: new Date(),
      dueDate: new Date(),
      principalAmount: 0,
      interest: 0,
      latePenalties: 0,
      totalAmount: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "loanId" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRepaymentsData((prevData) => [...prevData, formData]);
    handleCloseModal();
  };

  const filteredRepayments = repaymentsData.filter((repayment) =>
    Object.values(repayment).some(
      (value) =>
        typeof value === "number" && value.toString().includes(searchTerm)
    )
  );

  return (
    <div className="body-div">
      <div className="d-flex mb-2">
        <Button className="mr-2" onClick={handleOpenModal}>
          Add Repayment
        </Button>
        <FormControl
          className="custom-search-bar"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Repayment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLoanId">
              <Form.Label>Loan ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter loan ID"
                name="loanId"
                value={formData.loanId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPaymentDate">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="paymentDate"
                value={formData.paymentDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDate: date,
                  }));
                }}
              />
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    dueDate: date,
                  }));
                }}
              />
            </Form.Group>
            <Form.Group controlId="formPrincipalAmount">
              <Form.Label>Principal Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter principal amount"
                name="principalAmount"
                value={formData.principalAmount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formInterest">
              <Form.Label>Interest</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLatePenalties">
              <Form.Label>Late Penalties</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter late penalties"
                name="latePenalties"
                value={formData.latePenalties}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTotalAmount">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total amount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Payment Date</th>
            <th>Due Date</th>
            <th>Principal Amount</th>
            <th>Interest</th>
            <th>Late Penalties</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredRepayments.map((repayment, index) => (
            <tr key={index}>
              <td>{repayment.loanId}</td>
              <td>{new Date(repayment.paymentDate).toLocaleDateString()}</td>
              <td>{new Date(repayment.dueDate).toLocaleDateString()}</td>
              <td>{repayment.principalAmount}</td>
              <td>{repayment.interest}</td>
              <td>{repayment.latePenalties}</td>
              <td>{repayment.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Repayments;
