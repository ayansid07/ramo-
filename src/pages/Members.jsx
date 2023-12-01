// // Members.jsx

// import React, { useState } from 'react';
// import { Modal, Button, Form, Table } from 'react-bootstrap';

// const Members = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     memberNo: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     branch: '',
//   });
//   const [membersData, setMembersData] = useState([]);

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMembersData((prevData) => [...prevData, formData]);
//     handleCloseModal();
//   };

//   return (
//     <div className='body-div'>
//       <Button onClick={handleOpenModal}>Add Member</Button>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Member</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formMemberNo">
//               <Form.Label>Member No</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter member number"
//                 name="memberNo"
//                 value={formData.memberNo}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter first name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter last name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formBranch">
//               <Form.Label>Branch</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter branch"
//                 name="branch"
//                 value={formData.branch}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Add
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <Table striped bordered hover className="mt-4">
//         <thead>
//           <tr>
//             <th>Member No</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Branch</th>
//           </tr>
//         </thead>
//         <tbody>
//           {membersData.map((member, index) => (
//             <tr key={index}>
//               <td>{member.memberNo}</td>
//               <td>{member.firstName}</td>
//               <td>{member.lastName}</td>
//               <td>{member.email}</td>
//               <td>{member.branch}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Members;




import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const Members = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    memberNo: '',
    firstName: '',
    lastName: '',
    email: '',
    branch: '',
  });
  const [membersData, setMembersData] = useState([]);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

  const handleOpenModal = () => setShowModal(true);
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
    if (selectedMemberIndex !== null) {
      // Edit existing member
      const updatedMembers = [...membersData];
      updatedMembers[selectedMemberIndex] = formData;
      setMembersData(updatedMembers);
    } else {
      // Add new member
      setMembersData((prevData) => [...prevData, formData]);
    }
    handleCloseModal();
    // Reset form data and selected index
    setFormData({
      memberNo: '',
      firstName: '',
      lastName: '',
      email: '',
      branch: '',
    });
    setSelectedMemberIndex(null);
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
          <Modal.Title>{selectedMemberIndex !== null ? 'Edit' : 'Add'} Member</Modal.Title>
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
              <Form.Control
                type="text"
                placeholder="Enter branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
              />
            </Form.Group>
           
            <Button variant="primary" type="submit">
              {selectedMemberIndex !== null ? 'Edit' : 'Add'}
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
          {membersData.map((member, index) => (
            <tr key={index}>
              <td>{member.memberNo}</td>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.email}</td>
              <td>{member.branch}</td>
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