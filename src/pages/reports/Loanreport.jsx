import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Reports from '../Reports';

export default function Loanreport() {
  return (
    <div>
      <Reports />
      <div style={{ padding: '20px' }}>
      <Container>

<Row className="mt-4">
  <Col>
    <Form>
      <Row>
        <Col md={6} className="mb-2">
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>

        <Col md={6} className="mb-2">
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-2">
          <Form.Group controlId="loanType">
            <Form.Label>Loan Type</Form.Label>
            <Form.Control as="select">
              <option>Pending</option>
              <option>Approved</option>
              <option>Completed</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-2">
          <Form.Group controlId="memberNo">
            <Form.Label>Member No.</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="button">
        Search
      </Button>
    </Form>
  </Col>
</Row>

<hr className="mt-4 mb-4" />

<h2>Loan Report</h2>

<Table striped bordered hover className="mt-2">
  <thead>
    <tr>
      <th>Loan ID</th>
      <th>Member No</th>
      <th>Created</th>
      <th>Loan Product</th>
      <th>Borrower</th>
      <th>Applied Amount</th>
      <th>Due Amount</th>
      <th>Status</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    {/* Add your table rows dynamically based on data */}
    <tr>
      <td>1</td>
      <td>12345</td>
      <td>2023-01-01</td>
      <td>Personal Loan</td>
      <td>John Doe</td>
      <td>$10,000</td>
      <td>$2,000</td>
      <td>Approved</td>
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
