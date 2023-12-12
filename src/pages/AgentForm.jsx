import React, { useState } from 'react';
import { Button, Modal, Form ,Row,Col} from 'react-bootstrap';

export default function AgentForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    qualification: '',
    image: null,
    photo: null,
    fatherName: '',
    maritalStatus: '',
    dob: '',
    age: '',
    aadhar: '',
    panCard: '',
    address: '',
    permanentAddress: '',
    email: '',
    mobile: '',
    nomineeName: '',
    nomineeRelationship: '',
    nomineeDob: '',
    nomineeMobile: '',
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' || name === 'photo' ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
    // Reset form data and close modal
    setFormData({
      firstName: '',
      lastName: '',
      qualification: '',
      image: null,
      photo: null,
      fatherName: '',
      maritalStatus: '',
      dob: '',
      age: '',
      aadhar: '',
      panCard: '',
      address: '',
      permanentAddress: '',
      email: '',
      mobile: '',
      nomineeName: '',
      nomineeRelationship: '',
      nomineeDob: '',
      nomineeMobile: '',
    });
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Add Agent</Button>

      <Modal show={modalOpen} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form Fields */}
            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
           
            <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group> 
            </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formQualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formImage">
              <Form.Label>Upload Marksheet</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col md={6}>
            <Form.Group controlId="formPhoto">
              <Form.Label>Choose Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formFatherName">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
            <Form.Group controlId="formMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="married">Widowed</option>
                <option value="married">Divorced</option>
                {/* Add other options as needed */}
              </Form.Control>
            </Form.Group>
            </Col>

            <Col md={4}>
            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={4}>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>


            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formPanCard">
              <Form.Label>Pan Card</Form.Label>
              <Form.Control
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formAadhar">
              <Form.Label>Aadhar</Form.Label>
              <Form.Control
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
             
            </Row>

            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formPermanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>


            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            
            <Col md={6}>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>

            <br></br>
            <hr />
            <hr />
     {/* Nominee Details */}
            <br></br>

            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formNomineeName">
              <Form.Label>Nominee Name</Form.Label>
              <Form.Control
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formNomineeRelationship">
              <Form.Label>Nominee Relationship</Form.Label>
              <Form.Control
                type="text"
                name="nomineeRelationship"
                value={formData.nomineeRelationship}
                onChange={handleChange}
                />
            </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
            <Form.Group controlId="formNomineeDob">
              <Form.Label>Nominee Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="nomineeDob"
                value={formData.nomineeDob}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group controlId="formNomineeMobile">
              <Form.Label>Nominee Mobile</Form.Label>
              <Form.Control
                type="tel"
                name="nomineeMobile"
                value={formData.nomineeMobile}
                onChange={handleChange}
              />
            </Form.Group>
            </Col>
            </Row>

            {/* Buttons */}
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button className='mx-2' variant="info" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
