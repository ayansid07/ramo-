// Accounts.jsx

import React, { useState } from 'react';
import { Modal, Button, Form, Table, FormControl, Dropdown } from 'react-bootstrap';

const Accounts = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: '',
    member: '',
    accountType: 'Savings Account',
    status: 'Active',
    openingBalance: 0,
  });
  const [accountsData, setAccountsData] = useState([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccountIndex(null);
    setFormData({
      accountNumber: '',
      member: '',
      accountType: 'Savings Account',
      status: 'Active',
      openingBalance: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'openingBalance' ? parseFloat(value) : value,
    }));
  };

  const handleEdit = (index) => {
    const selectedAccount = accountsData[index];
    setFormData(selectedAccount);
    setSelectedAccountIndex(index);
    handleOpenModal();
  };

  const handleDelete = (index) => {
    const updatedAccountsData = [...accountsData];
    updatedAccountsData.splice(index, 1);
    setAccountsData(updatedAccountsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedAccountIndex !== null) {
      // Edit existing account
      const updatedAccountsData = [...accountsData];
      updatedAccountsData[selectedAccountIndex] = formData;
      setAccountsData(updatedAccountsData);
    } else {
      // Add new account
      setAccountsData((prevData) => [...prevData, formData]);
    }

    handleCloseModal();
  };

  const filteredAccounts = accountsData.filter((account) =>
    Object.values(account).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div className='body-div'>
      <div className="d-flex mb-2">
        <Button className="mr-2" onClick={() => { setFormData({}); handleOpenModal(); }}>
          Add Account
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
          <Modal.Title>{selectedAccountIndex !== null ? 'Edit Account' : 'Add Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMember">
              <Form.Label>Member</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter member name"
                name="member"
                value={formData.member}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
              >
                <option value="Savings Account">Savings Account</option>
                <option value="Loan Account">Loan Account</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formOpeningBalance">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter opening balance"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedAccountIndex !== null ? 'Edit' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Member</th>
            <th>Account Type</th>
            <th>Status</th>
            <th>Opening Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account, index) => (
            <tr key={index}>
              <td>{account.accountNumber}</td>
              <td>{account.member}</td>
              <td>{account.accountType}</td>
              <td>{account.status}</td>
              <td>{account.openingBalance}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Action
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Accounts;
