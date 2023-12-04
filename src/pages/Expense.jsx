import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date(),
    category: '',
    amount: '',
    reference: '',
    note: '',
  });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  // Simulating API call to fetch categories
    // Replace 'your-categories-api-endpoint' with the actual API endpoint for categories
    const fetchData = async () => {
      try {
        // const response = await fetch('your-categories-api-endpoint');
        // const data = await response.json();
        // setCategories(data); // Assuming data is an array of categories
        
        const response1 = await axios.get('http://localhost:3001/expenses'); // Replace with your expenses endpoint
        setExpenses(response1.data); // Assuming the response data contains an array of expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

  useEffect(() => {
    fetchData();
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
      category: '',
      amount: '',
      reference: '',
      note: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to your API endpoint to create a transaction
      const response = await axios.post('http://localhost:3001/expenses', formData);

      const data = await response.json();
      // console.log('Expense created:', data); // Log the response from the server
      
      // Reset form fields after successful submission if needed
      setFormData({
        date: new Date(),
        category: '',
        amount: '',
        reference: '',
        note: '',
      });
      fetchData();
    } catch (error) {
      // console.error('Error creating Expense:', error);
    }
    // console.log(formData);
    handleModalClose();
  };

  return (
    <div className='body-div'>
      <div style={{marginBottom:'3px'}}>
      <Button variant="primary" onClick={handleModalShow}>
        Add Expense
      </Button>  
      </div>
      <br/>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
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
                {/* {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))} */}
                <option value="A">Category A</option>
                <option value="B">Category B</option>
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

      <Table striped bordered hover>
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
            <td>{new Date(expense.date).toISOString().split('T')[0]}</td>
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
