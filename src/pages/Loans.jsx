// Loans.jsx

import React, { useState,useEffect } from 'react';
import { Modal, Button, Form, Table, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

const Loans = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    loanId: '',loanProduct: '',borrower: '',
    memberNo: '',releaseDate: new Date(), // Default date
    appliedAmount: '',status: 'Pending',
  });
  const [loansData, setLoansData] = useState([]);
  const [selectedLoanIndex, setSelectedLoanIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [memberNumbers,setmemberNumbers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleOpenEditModal = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3001/loans/${id}`);
      const loandata = response.data; // Assuming response.data contains the member data
      console.log(loandata);
      loandata.releaseDate = loandata.releaseDate ? parseISO(loandata.releaseDate) : new Date();
      
      // Assuming loandata has fields like firstName, lastName, email, etc.
      setFormData({
        id: loandata._id,
        loanId: loandata.loanId,
        loanProduct: loandata.loanProduct,
        borrower: loandata.borrower,
        memberNo: loandata.memberNo,
        releaseDate: loandata.releaseDate,
        appliedAmount: loandata.appliedAmount,
        status: loandata.status,
        // ... Add other fields as necessary based on your form structure
      });
  
      setShowEditModal(true); // Open the edit modal
    } catch (error) {
      console.error('Error fetching member data:', error);
      // Handle error or display an error message to the user
    }
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };


  const handleDelete = async (id) => {
    try{
      const response = axios.post(`http://localhost:3001/deleteloan/${id}`);
      console.log(response);
      alert('Delete Success');
    } 
    catch (error) {
      console.log('Failed Delete');
      alert('Delete Failed');
    }   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add new member
      await axios.post('http://localhost:3001/createloan', formData);
      // Close modal and reset form data and selected index
      handleCloseModal();
      setFormData({
        loanId: '',
        loanProduct: '',
        borrower: '',
        memberNo: '',
        releaseDate: new Date(), // Default date
        appliedAmount: '',
        status: '',
      });
    
      alert('Data Entered Successfully');
      handleCloseModal();
  } 
  catch (error) {
    alert('Check Data Fields for no duplicates');
    console.error('Error:', error);
    // Handle error or display an error message to the user
    handleCloseModal();
  }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update existing loan
      console.log(formData);
      await axios.put(`http://localhost:3001/updateloan/${formData.id}`, formData);
      // Reset form data and close modal after successful update
      setFormData({
        loanId: '',
        loanProduct: '',
        borrower: '',
        memberNo: '',
        releaseDate: new Date(), // Default date
        appliedAmount: '',
        status: '',
      });
      alert('Data Updated Successfully');
      handleCloseModal();
    } catch (error) {
      alert('Failed to update loan. Please check the data fields.');
      console.error('Error:', error);
      // Handle error or display an error message to the user
      handleCloseModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch loans data from the server
        const response = await axios.get('http://localhost:3001/loans');
        const fetchedLoans = response.data.data; // Assuming loans are nested inside 'data' field
        console.log('Fetched Loans',fetchedLoans);
        setLoansData(fetchedLoans);
      } catch (error) {
        console.error('Error fetching loans:', error);
        // Handle error or display an error message to the user
      }
      const response = await axios.get('http://localhost:3001/loans/members')
      .then(response => {
        console.log('Member Number Status:',response);
        setmemberNumbers(response.data.data);
      })
      .catch(error => console.log('Error Fetching Member Numbers'))  
    };
    fetchData(); // Fetch loans data when the component mounts
  }, []); // The empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    console.log('Loans Data',loansData);
    // Filter loans based on search term
    const x = loansData.filter((loan) =>
      Object.values(loan).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    const filteredLoans = setFilteredLoans(x);
    console.log('Filtered loans:', filteredLoans);
  }, [searchTerm, loansData]);

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
              as="select"
              name="memberNo"
              value={formData.memberNo}
              onChange={handleInputChange}
            >
              <option value="">Select Member No</option>
              {memberNumbers.map((memberNo) => (
                <option key={memberNo} value={memberNo}>
                  {memberNo}
                </option>
              ))}
            </Form.Control>
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
              Add
            </Button>
           
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
          <Form.Group controlId="Unique Table ID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
            </Form.Group>
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
              as="select"
              name="memberNo"
              value={formData.memberNo}
              onChange={handleInputChange}
            >
              <option value="">Select Member No</option>
              {memberNumbers.map((memberNo) => (
                <option key={memberNo} value={memberNo}>
                  {memberNo}
                </option>
              ))}
            </Form.Control>
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
              Update
            </Button>
           
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Unique Table ID</th>
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
          {filteredLoans.map((loan) => (
          <tr key={loan._id}>
          <td>{loan._id}</td>
          <td>{loan.loanId}</td>
          <td>{loan.loanProduct}</td>
          <td>{loan.borrower}</td>
          <td>{loan.memberNo}</td>
          <td>{new Date(loan.releaseDate).toLocaleDateString()}</td>
          <td>{loan.appliedAmount}</td>
          <td>{loan.status}</td>
          
              <td>
                <Button variant="info" onClick={() => handleOpenEditModal(loan._id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(loan._id)}>
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
