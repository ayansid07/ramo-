import React, { useState } from 'react';
import { Modal, Button, Form, Table, Alert, InputGroup, FormControl } from 'react-bootstrap';
import { FaEdit, FaTrash } from "react-icons/fa";


const Branches = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [membersData, setMembersData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success'); // or 'danger' for an error alert
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

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

  const handleSubmit = (e) => {
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

      // Show success alert for add
      setAlertVariant('success');
      setShowAlert(true);
    }

    // Reset form data
    setFormData({ name: '', email: '', phone: '', address: '' });

    // Close modal after a delay (you can adjust the delay as needed)
    setTimeout(() => {
      handleCloseModal();
    }, 500);
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

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Modal.Title>{selectedMemberIndex !== null ? 'Edit' : 'Add'} New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label> Address</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter address"
                name="address"
                value={formData.address}
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

      <Table responsive striped bordered hover className="mt-4 rounded-lg overflow-hidden">
        <thead>
          <tr>
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
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.address}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>
                  <FaEdit/>
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  <FaTrash/>
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
