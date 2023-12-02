import React, { useState,useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const Members = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    memberNo: '',
    firstName: '',
    lastName: '',
    email: '',
    branchName: '',
  });
  const [membersData, setMembersData] = useState([]);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [branchNames, setBranchNames] = useState([]);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/branches/names')
      .then(response => {
        setBranchNames(response.data.data);
      })
      .catch(error => console.error('Error fetching branch names:', error));

    // Fetch members data
    axios.get('http://localhost:3001/readmembers')
      .then(response => {
        const { data } = response.data; // Destructure the 'data' field from the response

        if (Array.isArray(data)) {
          setMembersData(data); // If it's already an array, set it directly
        } else if (typeof data === 'object') {
          // If it's an object (JSON), convert it to an array
          const dataArray = [data]; // Wrap single object in an array
          setMembersData(dataArray);
        } else {
          console.error('Invalid format for members data:', data);
        }
      })
      .catch(error => console.error('Error fetching members data:', error));
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Add new member
        await axios.post('http://localhost:3001/createmember', formData);
        // Close modal and reset form data and selected index
        handleCloseModal();
        setFormData({
          memberNo: '',
          firstName: '',
          lastName: '',
          email: '',
          branchName: '',
        });
        alert('Data Entered Successfully');
    } 
    catch (error) {
      alert('Check Data Fields for no duplicates');
      console.error('Error:', error);
      // Handle error or display an error message to the user
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
  };

  return (
    <div className='body-div'>
      <Button onClick={handleOpenModal}>Add Member</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                >
                  <option value="">Select a branch</option>
                  {branchNames.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
                <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Member No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {membersData.map((member) => (
            <tr>
              <td>{member.memberNo}</td>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.email}</td>
              <td>{member.branchName}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>
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
export default Members;