// Accounts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Table,
  FormControl,
  Dropdown,
} from "react-bootstrap";
const API_BASE_URL = process.env.REACT_APP_API_URL;
// // console.log("Api URL:", API_BASE_URL);

const Accounts = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    member: "",
    accountType: "", // Change default value to an empty string
    status: "", // Change default value to an empty string
    openingBalance: 0,
  });
  const [accountsData, setAccountsData] = useState([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [membersData, setMembersData] = useState([]);
  const [uniqueaccountid, setuniqueaccountid] = useState(0);
  const [branchNames, setBranchNames] = useState([]);
  const [userRole, setuserRole] = useState("");

  const [accountFormData, setAccountFormData] = useState({
    _id: "",
    memberNo: 0,
    memberName: "",
    email: "",
    branchName: "",
    photo: null,
    accountNumber: "",
    accountType: "",
    openingBalance: 0,
    currentBalance: 0,
    fatherName: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    currentAddress: "",
    permanentAddress: "",
    whatsAppNo: "",
    idProof: null,
    nomineeName: "",
    relationship: "",
    nomineeMobileNo: "",
    nomineeDateOfBirth: "",
  });

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccountIndex(null);
    setFormData({
      memberNo: 0,
      memberName: "",
      email: "",
      branchName: "",
      photo: null,
      accountNumber: "",
      accountType: "",
      openingBalance: 0,
      currentBalance: 0,
      fatherName: "",
      gender: "",
      maritalStatus: "",
      dateOfBirth: "",
      currentAddress: "",
      permanentAddress: "",
      whatsAppNo: "",
      idProof: null,
      nomineeName: "",
      relationship: "",
      nomineeMobileNo: "",
      nomineeDateOfBirth: "",
    });
  };

  const handleOpenEditModal = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounts/${id}`);
      const accountData = response.data.data; // Assuming response.data contains the account data

      setAccountFormData({
        _id: id,
        accountNumber: accountData.accountNumber,
        memberName: accountData.memberName,
        memberNo: accountData.memberNo,
        email: accountData.email,
        branchName: accountData.branchName,
        accountType: accountData.accountType,
        openingBalance: accountData.openingBalance,
        currentBalance: accountData.currentBalance,
        photo: null,
        fatherName: accountData.fatherName,
        gender: accountData.gender,
        maritalStatus: accountData.maritalStatus,
        dateOfBirth: accountData.dateOfBirth,
        currentAddress: accountData.currentAddress,
        permanentAddress: accountData.permanentAddress,
        whatsAppNo: accountData.whatsAppNo,
        idProof: null,
        nomineeName: accountData.nomineeName,
        relationship: accountData.relationship,
        nomineeMobileNo: accountData.nomineeMobileNo,
        nomineeDateOfBirth: accountData.nomineeDateOfBirth,
      });

      setShowEditModal(true); // Open the edit modal
    } catch (error) {
      // // console.error("Error fetching account data:", error);
      // Handle the error condition, show an error message, or perform other actions
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files && files.length > 0) {
      // If the input is a file type
      const file = files[0]; // Get the first file from the input
      // Handle the file here or store it in state as needed
      setAccountFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      // For other input types
      setAccountFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
    
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteaccounts/${id}`
      );
      // // console.log(response);
      // alert('Delete Success');
      fetchData(); // Fetch data after successful deletion
    } catch (error) {
      // // console.error('Failed Delete:', error);
      // alert('Delete Failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImages = new FormData();
      formDataWithImages.append("images", accountFormData.photo);
      formDataWithImages.append("images", accountFormData.idProof);
  
      const responseUpload = await axios.post(
        `${API_BASE_URL}/uploadmultiple`,
        formDataWithImages,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const imageUrls = {
        imageUrl1: responseUpload.data.urls[0], // Adjust index based on your response structure
        imageUrl2: responseUpload.data.urls[1], // Adjust index based on your response structure
      };
  
      const updatedAccountData = {
        ...accountFormData,
        photo: imageUrls.imageUrl1,
        idProof: imageUrls.imageUrl2,
      };
  
      await axios.put(
        `${API_BASE_URL}/updateaccounts/${updatedAccountData._id}`,
        updatedAccountData
      );
  
      fetchData(); // Fetch data after successful update
      handleCloseEditModal();
    } catch (error) {
      // Handle error
      handleCloseEditModal();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/createaccounts`, formData);
      // alert('Data Entered Successfully');
      fetchData(); // Fetch data after successful addition
      handleCloseModal();
      handleCloseModal();
    } catch (error) {
      // alert('Check Data Fields for no duplicates');
      // // console.error('Error:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch accounts data
      const response = await axios.get(`${API_BASE_URL}/accounts`);
      const allAccountsData = response.data.data; // Assuming response.data contains the account data
    
      if (userRole === 'agent') {
        // Filter accounts for agent with approved status
        const agentApprovedAccounts = allAccountsData.filter(
          (account) => account.approval === 'Approved'
        );
        setAccountsData(agentApprovedAccounts);
      } else {
        // For other user roles, set all accounts data
        setAccountsData(allAccountsData);
      }
    } catch (error) {
      // Handle error or display an error message to the user
    }
        
    const response = await axios
      .get(`${API_BASE_URL}/readmembersname`)
      .then((response) => {
        // // console.log('Member Name Status:',response);
        setMembersData(response.data.data);
      });
    // .catch((error) => // console.log("Error Fetching Member Numbers"));

    const uniqueaccountresponse = await axios.get(
      `${API_BASE_URL}/randomgenAccountId`
    );
    setuniqueaccountid(uniqueaccountresponse.data.uniqueid);

    const branchNamesResponse = await axios.get(
      `${API_BASE_URL}/branches/names`
    );
    setBranchNames(branchNamesResponse.data.data);

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      const tokenParts = token.split(".");
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);
      setuserRole(payload.role);
    } else {
      // // console.log("Token not found in localStorage");
    }
  };

  useEffect(() => {
    // Fetch accounts data initially
    fetchData();
    // ... Rest of your useEffect code remains the same
  }, []); // Run once on component mount

  useEffect(() => {
    // Filter accountsData based on searchTerm whenever searchTerm changes
    const filtered = accountsData.filter((account) =>
      Object.values(account).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, accountsData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAccountApproval = async (accountId) => {
    // Implement approve loan logic
    const response = await axios.put(
      `${API_BASE_URL}/approveaccount/${accountId}`
    );
    // // console.log(response);
    fetchData();
  };

  const handleAccountCancel = async (accountId) => {
    const response = await axios.put(
      `${API_BASE_URL}/cancelaccount/${accountId}`
    );
    // // console.log(response);
    fetchData();
  };

  // Function to render the entire table based on user type
  function renderTableForUserType(filteredAccounts) {
    switch (userRole) {
      case "admin":
        return (
          <table>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Member Number</th>
                <th>Member Name</th>
                <th>Account Type</th>
                <th>Opening Balance</th>
                <th>Current Balance</th>
                <th>Branch</th>
                <th>Email</th>
                <th>Action</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account._id}>
                  <td>{account.accountNumber}</td>
                  <td>{account.memberNo}</td>
                  <td>{account.memberName}</td>
                  <td>{account.accountType}</td>
                  <td>{account.openingBalance}</td>
                  <td>{account.currentBalance}</td>
                  <td>{account.branchName}</td>
                  <td>{account.email}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="btn-secondary"
                        variant="primary"
                        id={`dropdown-${account._id}`}
                      >
                        Action
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleOpenEditModal(account._id)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDelete(account._id)}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAccountApproval(account._id)}
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleAccountCancel(account._id)}
                        >
                          Reject
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{account.approval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
        case "manager":
          return (
            <table>
              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Member Number</th>
                  <th>Member Name</th>
                  <th>Account Type</th>
                  <th>Opening Balance</th>
                  <th>Current Balance</th>
                  <th>Branch</th>
                  <th>Email</th>
                  <th>Action</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account._id}>
                    <td>{account.accountNumber}</td>
                    <td>{account.memberNo}</td>
                    <td>{account.memberName}</td>
                    <td>{account.accountType}</td>
                    <td>{account.openingBalance}</td>
                    <td>{account.currentBalance}</td>
                    <td>{account.branchName}</td>
                    <td>{account.email}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="btn-secondary"
                          variant="primary"
                          id={`dropdown-${account._id}`}
                        >
                          Action
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleOpenEditModal(account._id)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDelete(account._id)}
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleAccountApproval(account._id)}
                          >
                            Approve
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleAccountCancel(account._id)}
                          >
                            Reject
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>{account.approval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
          case "agent":
            return (
              <table>
                <thead>
                  <tr>
                    <th>Account Number</th>
                    <th>Member Number</th>
                    <th>Member Name</th>
                    <th>Account Type</th>
                    <th>Opening Balance</th>
                    <th>Current Balance</th>
                    <th>Branch</th>
                    <th>Email</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account._id}>
                      <td>{account.accountNumber}</td>
                      <td>{account.memberNo}</td>
                      <td>{account.memberName}</td>
                      <td>{account.accountType}</td>
                      <td>{account.openingBalance}</td>
                      <td>{account.currentBalance}</td>
                      <td>{account.branchName}</td>
                      <td>{account.email}</td>
                      <td>{account.approval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );      
      // Add cases for other user types if needed
      default:
        return null; // If userType doesn't match any case, return null or handle accordingly
    }
  }

  return (
    <div className="body-div">
      <div className="d-flex mb-2">
        {/* <Button
          className="mr-2"
          onClick={() => {
            setFormData({});
            handleOpenModal();
          }}
        >
          Add Account
        </Button> */}
        <FormControl
          className="custom-search-bar"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account number"
                name="accountNumber"
                value={uniqueaccountid}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMember">
              <Form.Label>Member</Form.Label>
              <Form.Control
                as="select" // Render as a dropdown select
                name="member"
                value={formData.member}
                onChange={handleInputChange}
              >
                <option value="">Select member</option>
                {/* Map through the membersData array to create options */}
                {membersData.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Savings">Savings Account</option>
                <option value="Loan">Loan Account</option>
              </Form.Control>
            </Form.Group>
            {/* <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group> */}
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
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            {/* Assuming formData is your state containing account information */}
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="id"
                value={accountFormData._id}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="accountNumber"
                value={accountFormData.accountNumber}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formMemberName">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter member name"
                name="memberName"
                value={accountFormData.memberName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMemberNo">
              <Form.Label>Member Number</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="memberNo"
                value={accountFormData.memberNo}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={accountFormData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBranchName">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control
                as="select"
                name="branchName"
                value={accountFormData.branchName}
                onChange={handleInputChange}
              >
                <option value="">Select a branch</option>
                {/* Populate branch names dynamically */}
                {branchNames.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                name="accountType"
                value={accountFormData.accountType}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Savings">Savings Account</option>
                <option value="Loan">Loan Account</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formOpeningBalance">
              <Form.Label>Opening Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter opening balance"
                name="openingBalance"
                value={accountFormData.openingBalance}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formOpeningBalance">
              <Form.Label>Current Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Current balance"
                name="currentBalance"
                value={accountFormData.currentBalance}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="photo"
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Father's Name */}
            <Form.Group controlId="formFatherName">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter father's name"
                name="fatherName"
                value={accountFormData.fatherName}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Gender */}
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={accountFormData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            {/* Marital Status */}
            <Form.Group controlId="formMaritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select
                name="maritalStatus"
                value={accountFormData.maritalStatus}
                onChange={handleInputChange}
              >
                <option>Select Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </Form.Select>
            </Form.Group>
            {/* Date of Birth */}
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                name="dateOfBirth"
                value={accountFormData.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Current Address */}
            <Form.Group controlId="formCurrentAddress">
              <Form.Label>Current Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter current address"
                name="currentAddress"
                value={accountFormData.currentAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Permanent Address */}
            <Form.Group controlId="formPermanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter permanent address"
                name="permanentAddress"
                value={accountFormData.permanentAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* WhatsApp Number */}
            <Form.Group controlId="formWhatsAppNo">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter WhatsApp number"
                name="whatsAppNo"
                value={accountFormData.whatsAppNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* ID Proof */}
            <Form.Group controlId="formIdProof">
              <Form.Label>ID Proof</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="idProof"
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Nominee Name */}
            <Form.Group controlId="formNomineeName">
              <Form.Label>Nominee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nominee name"
                name="nomineeName"
                value={accountFormData.nomineeName}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Relationship */}
            <Form.Group controlId="formRelationship">
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter relationship"
                name="relationship"
                value={accountFormData.relationship}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Nominee Mobile Number */}
            <Form.Group controlId="formNomineeMobileNo">
              <Form.Label>Nominee Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nominee mobile number"
                name="nomineeMobileNo"
                value={accountFormData.nomineeMobileNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Nominee Date of Birth */}
            <Form.Group controlId="formNomineeDateOfBirth">
              <Form.Label>Nominee Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter nominee date of birth"
                name="nomineeDateOfBirth"
                value={accountFormData.nomineeDateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table
        striped
        responsive
        bordered
        hover
        className="mt-4 rounded-lg overflow-hidden"
      >
        {renderTableForUserType(filteredAccounts)}
      </Table>
    </div>
  );
};

export default Accounts;
