import React, { useState } from 'react';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    status: '',
    image: null,
  });
  const [usersData, setUsersData] = useState([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for API submission
    const formDataForApi = new FormData();
    formDataForApi.append('name', formData.name);
    formDataForApi.append('email', formData.email);
    formDataForApi.append('password', formData.password);
    formDataForApi.append('userType', formData.userType);
    formDataForApi.append('status', formData.status);
    formDataForApi.append('image', formData.image);

    // Add logic to send formDataForApi to the server using fetch or your preferred method

    setUsersData((prevData) => [...prevData, formData]);
    handleCloseModal();
  };

  const handleEdit = (index) => {
    // Implement edit logic here
    // You can pre-fill the form with existing data for editing
    // and open the modal
  };

  const handleDelete = (index) => {
    // Implement delete logic here
    // Remove the user from the usersData array
    const updatedUsersData = [...usersData];
    updatedUsersData.splice(index, 1);
    setUsersData(updatedUsersData);
  };

  return (
    <div className='body-div'>
      <Button onClick={handleOpenModal}>Add User</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
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
                required
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
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUserType">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Control>
            </Form.Group>
      
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
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
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={index}>
              <td>
                {user.image ? (
                  <img
                    src={URL.createObjectURL(user.image)}
                    alt="Profile"
                    width="40"
                    height="40"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
                <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                  {user.status}
                </Badge>
              </td>
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

export default User;
