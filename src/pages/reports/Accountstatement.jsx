import React from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Reports from '../Reports';

const AccountStatement = () => {
  const handleExportToPDF = () => {
    const blob = new Blob([<MyDocument data={data} />], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'AccStatement.pdf';
    link.click();
  };
  return (
    <div>
    <Reports />
      <br/>
      
    <div style={{ padding: '20px' }}>
      <Row className="mb-3">
        <Col>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col>
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col>
                <Form.Label>Account No.:</Form.Label>
                <Form.Control type="text" placeholder="Enter Account No." />
              </Col>
              <Col>
                <Button variant="primary" type="button" className="mt-8">
                  Search
                </Button>
                 <Button variant="danger" onClick={handleExportToPDF}>
                  Export to PDF
                </Button>

              </Col>
              
            </Row>
          </Form>
        </Col>
      </Row>

      <hr />
      <br/>

      <Table striped bordered hover className='rounded-lg overflow-hidden'>
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
          {/* Add your table rows here */}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default AccountStatement;
