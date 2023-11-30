// Loans.jsx

import React, { useState } from 'react';
import { Modal, Button, Form, Table, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Loans = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    loanId: '',
    loanProduct: '',
    borrower: '',
    memberNo: '',
    releaseDate: new Date(), // Default date
    appliedAmount: '',
    status: 'Pending',
  });
  const [loansData, setLoansData] = useState([]);
  const [selectedLoanIndex, setSelectedLoanIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLoanIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      status: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      releaseDate: date,
    }));
  };

  const handleEdit = (index) => {
    const selectedLoan = loansData[index];
    setFormData(selectedLoan);
    setSelectedLoanIndex(index);
    handleOpenModal();
  };

  const handleDelete = (index) => {
    const updatedLoansData = [...loansData];
    updatedLoansData.splice(index, 1);
    setLoansData(updatedLoansData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedLoanIndex !== null) {
      // Edit existing loan
      const updatedLoansData = [...loansData];
      updatedLoansData[selectedLoanIndex] = formData;
      setLoansData(updatedLoansData);
    } else {
      // Add new loan
      setLoansData((prevData) => [...prevData, formData]);
    }

    handleCloseModal();
  };

  const filteredLoans = loansData.filter((loan) =>
    Object.values(loan).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  return (
    <div className='body-div'>
      <div className="d-flex mb-2">
        <Button className="mr-2" onClick={() => { setFormData({}); handleOpenModal(); }}>
          Add Loan
        </Button>
        <FormControl
          className='custom-search-bar'
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLoanId">
              <Form.Label>Loan ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter loan ID"
                name="loanId"
                value={formData.loanId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLoanProduct">
              <Form.Label>Loan Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter loan product"
                name="loanProduct"
                value={formData.loanProduct}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBorrower">
              <Form.Label>Borrower</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter borrower name"
                name="borrower"
                value={formData.borrower}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMemberNo">
              <Form.Label>Member No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter member number"
                name="memberNo"
                value={formData.memberNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formReleaseDate">
              <Form.Label>Release Date</Form.Label>
              <br />
              <DatePicker
                selected={formData.releaseDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
              />
            </Form.Group>
            <Form.Group controlId="formAppliedAmount">
              <Form.Label>Applied Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter applied amount"
                name="appliedAmount"
                value={formData.appliedAmount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Approved"
                  value="Approved"
                  checked={formData.status === 'Approved'}
                  onChange={handleStatusChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Pending"
                  value="Pending"
                  checked={formData.status === 'Pending'}
                  onChange={handleStatusChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Cancelled"
                  value="Cancelled"
                  checked={formData.status === 'Cancelled'}
                  onChange={handleStatusChange}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedLoanIndex !== null ? 'Edit' : 'Add'}
            </Button>
           
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Product</th>
            <th>Borrower</th>
            <th>Member No</th>
            <th>Release Date</th>
            <th>Loan Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
         
          <tbody>
          {filteredLoans.map((loan, index) => (
            <tr key={index}>
               <td>{loan.loanId}</td>
          <td>{loan.loanProduct}</td>
          <td>{loan.borrower}</td>
          <td>{loan.memberNo}</td>
          <td>{new Date(loan.releaseDate).toLocaleDateString()}</td>
          <td>{loan.appliedAmount}</td>
          <td>{loan.status}</td>
          
              <td>
                <Button variant="info" onClick={() => handleEdit(index)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Loans;
