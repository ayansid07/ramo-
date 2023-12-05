import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date(),
    category: "",
    amount: "",
    reference: "",
    note: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  // Simulating API call to fetch categories
  useEffect(() => {
    // Replace 'your-categories-api-endpoint' with the actual API endpoint for categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("your-categories-api-endpoint");
        const data = await response.json();
        setCategories(data); // Assuming data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    // Reset form data when the modal is closed
    setFormData({
      date: new Date(),
      category: "",
      amount: "",
      reference: "",
      note: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to the server)
    const newExpense = { ...formData };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    // Close the modal after submission
    handleModalClose();
  };

  return (
    <div className="body-div">
      <div style={{ marginBottom: "3px" }}>
        <Button variant="primary" onClick={handleModalShow}>
          Add Expense
        </Button>
      </div>
      <br />
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  handleDateChange(date);
                }}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Reference</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date.toISOString().split("T")[0]}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.reference}</td>
              <td>{expense.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Expense;
