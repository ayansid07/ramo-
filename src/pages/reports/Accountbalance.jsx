import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Reports from '../Reports';

export default function Accountbalance() {
  return (
    <div>
      <Reports />
    
    <div style={{ padding: '20px' }} >

    <Container>
      <Row className="mt-4">
        <Col md={6} className="d-flex">
          <Form.Group controlId="memberNo" className="mr-2 flex-grow-1">
            <Form.Label className="mr-2">Member No.</Form.Label>
            <Form.Control type="text" placeholder="Enter member no." />
          </Form.Group>
          <Button variant="primary" type="button"  className="mt-8">
            Search
          </Button>
        </Col>
      </Row>

      <hr className="mt-4 mb-4" />

      <h2>Account Balance</h2>

      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Account No.</th>
            <th>Balance</th>
            <th>Loan</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* Add your table rows dynamically based on data */}
          <tr>
            <td>1</td>
            <td>1000</td>
            <td>500</td>
            <td>500</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
    </Container>
    </div>
    </div>
  );
}
