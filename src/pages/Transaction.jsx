// Transaction.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './depositform.css'

const Transaction = () => {
  const [formData, setFormData] = useState({
    date: '',
    member: '',
    accountNumber: '',
    amount: '',
    transactionType: '',
    status: 'Completed',
    description: '',
  });

  const [members, setMembers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  useEffect(() => {
    // Fetch members from API
    fetchMembers();

    // Fetch accounts from API
    fetchAccounts();

    // Fetch transaction types from API
    fetchTransactionTypes();
  }, []);

  const fetchMembers = async () => {
    try {
      // Replace 'your-members-api-endpoint' with the actual API endpoint for members
      const response = await fetch('your-members-api-endpoint');
      const data = await response.json();
      setMembers(data); // Assuming data is an array of members
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      // Replace 'your-accounts-api-endpoint' with the actual API endpoint for accounts
      const response = await fetch('your-accounts-api-endpoint');
      const data = await response.json();
      setAccounts(data); // Assuming data is an array of accounts
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const fetchTransactionTypes = async () => {
    try {
      // Replace 'your-transaction-types-api-endpoint' with the actual API endpoint for transaction types
      const response = await fetch('your-transaction-types-api-endpoint');
      const data = await response.json();
      setTransactionTypes(data); // Assuming data is an array of transaction types
    } catch (error) {
      console.error('Error fetching transaction types:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send form data to your API
    console.log(formData);
  };

  return (
    <div className='body-div'>

    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="date">
          <Form.Label  className="custom-form-label">Date *</Form.Label>
          <Form.Control
          className="custom-form-control"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="member">
          <Form.Label  className="custom-form-label">Member *</Form.Label>
          <Form.Control
          className="custom-form-control"
            as="select"
            name="member"
            value={formData.member}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="accountNumber">
          <Form.Label  className="custom-form-label">Account Number *</Form.Label>
          <Form.Control
          className="custom-form-control"
            as="select"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label  className="custom-form-label">Amount *</Form.Label>
          <Form.Control
          className="custom-form-control"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="transactionType">
          <Form.Label  className="custom-form-label">Debit/Credit *</Form.Label>
          <Form.Control
          className="custom-form-control"
            as="select"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label  className="custom-form-label">Status *</Form.Label>
          <Form.Control
          className="custom-form-control"
            as="select"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label  className="custom-form-label">Description *</Form.Label>
          <Form.Control
          className="custom-form-control"
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
  );
};

export default Transaction;
