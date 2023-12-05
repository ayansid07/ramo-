import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Reports from '../Reports';

export default function Transaction() {
  return (
    <div>
      <Reports />

      <div style={{padding:'20px'}}>
    <Container>

      <h2 className="mt-4">Transaction</h2>

      <Row className="mt-4">
        <Col>
          <Form>
            <Row>
              {/* Start Date */}
              <Col md={3} className="mb-2">
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>

              {/* End Date */}
              <Col md={3} className="mb-2">
                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>

              {/* Type Dropdown */}
              <Col md={2} className="mb-2">
                <Form.Group controlId="transactionType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select">
                    <option>Debit</option>
                    <option>Credit</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Status Dropdown */}
              <Col md={2} className="mb-2">
                <Form.Group controlId="transactionStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select">
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>All</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Account Number Input */}
              <Col md={2} className="mb-2">
                <Form.Group controlId="accountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text"
                  placeholder='Enter Acc No.' />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-2">
              {/* Search Button */}
              <Col md={8}>
                <Button variant="primary" type="button">
                  Search
                </Button>
              </Col>

              {/* Export to PDF Button */}
              <Col md={4} className="text-right">
                <Button variant="danger" type="button">
                  Export to PDF
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Separation Line */}
      <hr className="my-4" />

      {/* Transaction Table */}
      <Table striped bordered hover className="mt-2 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th>Date</th>
            <th>Member</th>
            <th>AC Number</th>
            <th>Amount</th>
            <th>DR/CR</th>
            <th>Type</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          <tr>
            <td>2023-01-01</td>
            <td>John Doe</td>
            <td>12345</td>
            <td>$1,000.00</td>
            <td>DR</td>
            <td>Debit</td>
            <td>Completed</td>
            <td>View Details</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
    </Container>
    </div>
    </div>
  );
}
