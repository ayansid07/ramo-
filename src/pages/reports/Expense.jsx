import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Reports from '../Reports';

export default function Expense() {
  return (
    <div>
      <Reports />

      <div style={{ padding: '20px' }}>
    <Container>

      <h2 className="mt-4">Expense</h2>

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

              {/* Expense Type Dropdown */}
              <Col md={3} className="mb-2">
                <Form.Group controlId="expenseType">
                  <Form.Label>Expense Type</Form.Label>
                  <Form.Control as="select">
                    <option>Food</option>
                    <option>Staff</option>
                    <option>Office Rent</option>
                    <option>Transport</option>
                  </Form.Control>
                </Form.Group>
              </Col>
 
            </Row>
            {/* Search Button */}
              <Button variant="primary" type="button">
                  Search
              </Button>
          </Form>
        </Col>
      </Row>

      {/* Separation Line */}
      <hr className="my-4" />

      <h2>Expense Report</h2>

      {/* Search Bar and Export PDF Button */}
      <Row className="mt-4">
        <Col md={6}>
          <Form>
            <Form.Group controlId="expenseSearch">
              <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="text-right">
          <Button variant="danger" type="button">
            Export to PDF
          </Button>
        </Col>
      </Row>

      {/* Expense Table */}
      <Table striped bordered hover className="mt-2 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Expense Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          <tr>
            <td>2023-01-01</td>
            <td>Ref123</td>
            <td>Food</td>
            <td>$100.00</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
    </Container>
    </div>
    </div>
  );
}
