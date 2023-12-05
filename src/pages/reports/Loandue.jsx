import React, { useRef, useState } from 'react';
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
  const [searchValue, setSearchValue] = useState('');
  const data = [
    { id: 1, loanId: '1', memberNo: '12345', member: 'John Doe', totalDue: '$2,000' },
    { id: 2, loanId: '2', memberNo: '09876', member: 'Jane Doe', totalDue: '$1,500' },
    { id: 3, loanId: '3', memberNo: '45678', member: 'Bob Smith', totalDue: '$3,000' },
    // Add more data as needed
  ];

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) => String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleExportToPDF = () => {
    const blob = new Blob([<MyDocument data={filteredData} />], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'LoanDueReport.pdf';
    link.click();
  };

  const handleSearch = () => {
    // Perform search logic here if needed
    // setSearchValue(/* get the search input value */);
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
                      <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="d-flex justify-content-between">
                    <Button variant="primary" type="button" onClick={handleSearch}>
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

          <div className="mt-4" ref={componentRef}>
            <Table striped bordered hover className='rounded-lg overflow-hidden'>
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Member No.</th>
                  <th>Member</th>
                  <th>Total Due</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
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
