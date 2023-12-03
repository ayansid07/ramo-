import React, { useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Reports from '../Reports';
import axios from 'axios';

const AccountStatement = () => {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/transactionsByDate`, {
        params: {
          startDate,
          endDate,
          accountNumber
        }
      });
      
      if (response.status === 200) {
        // Ensure that response.data.data contains the array of transactions
        setTransactions(response.data.data); // Assuming your response data is an array of transactions
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <Reports />
      <br />
      <div style={{ padding: '20px' }}>
        <Row className="mb-3">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Start Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Label>Account No.:</Form.Label>
                  <Form.Control
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter Account No."
                  />
                </Col>
                <Col>
                  <Button variant="primary" type="submit" className="mt-8">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
             {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.debit}</td>
                  <td>{transaction.credit}</td>
                  <td>{transaction.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AccountStatement;
