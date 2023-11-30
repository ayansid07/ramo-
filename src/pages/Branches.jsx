import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Alert, InputGroup, FormControl } from 'react-bootstrap';

const Branches = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ branchName: '', contactemail: '', contactphone: '', branchaddress: '' });
  const [membersData, setMembersData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success'); // or 'danger' for an error alert
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
    // Reset alert when modal is opened
    setShowAlert(false);
    // Clear selected member index when opening the modal
    setSelectedMemberIndex(null);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {      
      const response = await axios.post('http://localhost:3001/createbranch', formData);
      console.log('Data sent to the backend:', response.data);
      setFormData({
        branchName: '', contactemail: '', contactphone: '', branchaddress: ''
      });
  
      // Show success alert after successful creation
      setAlertVariant('success');
      setShowAlert(true);
  
      // Reset form data
      setFormData({ branchName: '', contactemail: '', contactphone: '', branchaddress: '' });
  
      // Close modal after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    } catch (error) {
      console.error('Error sending data: ', error);
  
      // Show error alert if request fails
      setAlertVariant('error');
      setShowAlert(true);
    }
  };

  const handleEdit = (index) => {
    // Set form data for editing
    setFormData(membersData[index]);
    // Set the selected member index
    setSelectedMemberIndex(index);
    // Open the modal for editing
    handleOpenModal();
  };

  const handleDelete = (index) => {
    // Delete member
    const updatedMembers = [...membersData];
    updatedMembers.splice(index, 1);
    setMembersData(updatedMembers);

    // Show success alert for delete
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/readbranch')
      .then((response) => {
        const responseData = response.data;
  
        // Check if data is available and it's an array
        if (Array.isArray(responseData.data)) {
          const branches = responseData.data;
  
          const formattedData = branches.map((branch) => ({
            id: branch._id,
            branchName: branch.branchName,
            contactemail: branch.contactemail,
            contactphone: branch.contactphone,
            branchaddress: branch.branchaddress,
            // Add other properties if needed
          }));
  
          const filteredData = formattedData.filter((branch) =>
            branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
          );
  
          // Update the state variable filteredMembers with filteredData
          setFilteredMembers(filteredData);
        } else {
          console.error('No branches data found or invalid data structure.');
        }
      })
      .catch((error) => {
        console.error('Error fetching branches:', error);
        // Handle error fetching branches
      });
  }, [searchTerm]);
    
  return (
    <div className='body-div'>
      
      {/* <Button onClick={handleOpenModal}>Add New</Button>
        <FormControl
        className='custom-search-bar'
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        /> */}

    <div className="d-flex mb-2">
        <Button className="mr-2" onClick={() => { setFormData({}); handleOpenModal(); }}>
          Add Branch
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
          <Modal.Title>{selectedMemberIndex !== null ? 'Edit' : 'Add'} New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="contactemail"
                value={formData.contactemail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                name="contactphone"
                value={formData.contactphone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label> Address</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter address"
                name="branchaddress"
                value={formData.branchaddress}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedMemberIndex !== null ? 'Edit' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Alert show={showAlert} variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
        {alertVariant === 'success' ? 'Success! Operation completed.' : 'Error! Something went wrong.'}
      </Alert>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.id}</td>
              <td>{member.branchName}</td>
              <td>{member.contactemail}</td>
              <td>{member.contactphone}</td>
              <td>{member.branchaddress}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(member.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(member.id)}>
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

export default Branches;
