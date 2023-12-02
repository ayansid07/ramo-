import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Reports from '../Reports';
import { useReactToPrint } from 'react-to-print';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Loan Due Report</Text>
        <Table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Member No.</th>
              <th>Member</th>
              <th>Total Due</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.loanId}</td>
                <td>{row.memberNo}</td>
                <td>{row.member}</td>
                <td>{row.totalDue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </View>
    </Page>
  </Document>
);

export default function Loandue() {
  const componentRef = useRef();
  const data = [
    { id: 1, loanId: '1', memberNo: '12345', member: 'John Doe', totalDue: '$2,000' },
    // Add more data as needed
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleExportToPDF = () => {
    const blob = new Blob([<MyDocument data={data} />], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'LoanDueReport.pdf';
    link.click();
  };

  return (
    <div>
      <Reports />
      <div style={{ padding: '20px' }}>

    
    <Container>

      <h2 className="mt-4">Loan Due Report</h2>

      <Row className="mt-4">
        <Col>
          <Form>
            <Row className="mb-2">
              <Col md={6}>
                <Form.Group controlId="searchBar">
                  <Form.Control type="text" placeholder="Search..." />
                </Form.Group>
              </Col>

              <Col md={6} className="d-flex justify-content-between">
                <Button variant="primary" type="submit" onClick={handlePrint}>
                  Print
                </Button>
                <Button variant="danger" onClick={handleExportToPDF}>
                  Export to PDF
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <div className="mt-4" ref={componentRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Member No.</th>
              <th>Member</th>
              <th>Total Due</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.loanId}</td>
                <td>{row.memberNo}</td>
                <td>{row.member}</td>
                <td>{row.totalDue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
    </div>
    </div>
  );
}
