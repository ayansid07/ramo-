import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Alert, InputGroup, FormControl } from 'react-bootstrap';

const Branches = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ branchName: '', contactemail: '', contactphone: '', branchaddress: '' });
  const [membersData, setMembersData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success'); // or 'danger' for an error alert
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]); // State to hold filtered members

  const handleOpenModal = () => {
    setShowModal(true);
    // Reset alert when modal is opened
    setShowAlert(false);
    // Clear selected member index when opening the modal
    setSelectedMemberIndex(null);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleOpenEditModal = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/getbranch/${id}`);
      const selectedMemberData = response.data; // Assuming response.data contains the member data
      console.log(selectedMemberData);
      // Set the form data to the retrieved member's data
      setFormData(selectedMemberData);
      setShowEditModal(true); // Open the edit modal
    } catch (error) {
      console.error('Error fetching member data:', error);
      // Handle error or display an error message to the user
    }
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedMemberIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if it's an update or add operation
    if (selectedMemberIndex !== null) {
      // Update existing member
      const updatedMembers = [...membersData];
      updatedMembers[selectedMemberIndex] = formData;
      setMembersData(updatedMembers);

      // Show success alert for update
      setAlertVariant('success');
      setShowAlert(true);
    } else {
      // Add new member
      setMembersData((prevData) => [...prevData, formData]);
      // Axios Create request here for posting data (Posting Correctly)
      console.log(formData);
      try {      
        const response =  await axios.post('http://localhost:3001/createbranch',formData);
        console.log('Data Successfully entered in Backend Server',formData);
        // Show success alert for add
        setAlertVariant('success');
        setShowAlert(true);      
      } catch (error) {
        console.log('Some Error in submitting the form data to backend');
        setAlertVariant('failed');
        setShowAlert(true);
      }
    }

    // Reset form data
    setFormData({ branchName: '', email: '', phone: '', address: '' });

    // Close modal after a delay (you can adjust the delay as needed)
    setTimeout(() => {
      handleCloseModal();
    }, 500);
  };

  const handleUpdate = async (e,id) => {
    e.preventDefault()
    console.log(id);
    try {
      // Update member
      console.log(formData);
      const response = await axios.put(`http://localhost:3001/updatebranch/${formData._id}`, formData);
      console.log(response.data);

      // Show success alert for update
      setAlertVariant('success');
      setShowAlert(true);

      // Close the edit modal
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating data:', error);
      // Show failure alert for update
      setAlertVariant('failed');
      setShowAlert(true);
    }
  };

  const handleDelete = async (id) => {
    // Delete member from table
    try {
      console.log(id);
      const response = await axios.post('http://localhost:3001/deletebranch/',{id});
      console.log(response);
    } catch (error){
      console.log('Error in deleting data');
    }

    // Show success alert for delete
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/readbranch');
        const { data } = response.data; // Extract 'data' array from the response

        // Filter the 'data' array based on searchTerm
        const filteredData = data.filter((member) =>
          member.branchName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update filteredMembers state with the filtered data
        setFilteredMembers(filteredData);
      } catch (error) {
        console.error('Error while fetching data:', error);
        // Handle the error or show an error message to the user
      }
    };

    fetchData(); // Call fetchData initially when the component mounts

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 20000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
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
      
      {/* Edit Branch Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control 
              type="integer"
              placeholder='Enter Id'
              name='branchId'
              value={formData.branchId}
              onChange={handleInputChange}
            />
          </Form.Group>
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
            <Button variant="primary" type="submit">Update</Button>
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
          {filteredMembers.map((member) => (
            <tr>
              <td>{member._id}</td>
              <td>{member.branchName}</td>
              <td>{member.contactemail}</td>
              <td>{member.contactphone}</td>
              <td>{member.branchaddress}</td>
              <td>
                <Button variant="warning" onClick={() => handleOpenEditModal(member._id)}>
                  Edit
                </Button>{' '}
                <Button variant="Deleted Succcessfully" onClick={() => handleDelete(member._id)}>
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