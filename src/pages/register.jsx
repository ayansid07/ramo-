import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    branch: '',
    countryCode: '',
    mobile: '',
    password: '',
    gender: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    creditSource: '',
  });

  const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
    { code: '+7', name: 'Russia' },
    { code: '+82', name: 'South Korea' },
    { code: '+34', name: 'Spain' },
    { code: '+39', name: 'Italy' },
    { code: '+52', name: 'Mexico' },
    { code: '+31', name: 'Netherlands' },
    { code: '+64', name: 'New Zealand' },
    { code: '+54', name: 'Argentina' },
    { code: '+55', name: 'Brazil' },
    { code: '+57', name: 'Colombia' },
    { code: '+20', name: 'Egypt' },
    { code: '+372', name: 'Estonia' },
    { code: '+358', name: 'Finland' },
    { code: '+30', name: 'Greece' },
    { code: '+852', name: 'Hong Kong' },
    { code: '+353', name: 'Ireland' },
    { code: '+972', name: 'Israel' },
    { code: '+60', name: 'Malaysia' },
    { code: '+47', name: 'Norway' },
    { code: '+51', name: 'Peru' },
    { code: '+63', name: 'Philippines' },
    { code: '+48', name: 'Poland' },
    { code: '+65', name: 'Singapore' },
    { code: '+46', name: 'Sweden' },
    { code: '+41', name: 'Switzerland' },
    { code: '+66', name: 'Thailand' },
    { code: '+90', name: 'Turkey' },
    { code: '+380', name: 'Ukraine' },
    { code: '+598', name: 'Uruguay' },
    { code: '+58', name: 'Venezuela' },
    { code: '+84', name: 'Vietnam' },
    // Add more country codes here
  ];
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/create', formData);
      console.log('Data sent to the backend:', response.data);
      setFormData({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        branch: '',
        countryCode: '',
        mobile: '',
        password: '',
        gender: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
        creditSource: '',
      });
    } catch (error) {
      console.error('Error sending data: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      First Name:
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Last Name:
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Business Name:
      <input
        type="text"
        name="businessName"
        value={formData.businessName}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Email:
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
        Branch:
        <select
          name="branch"
          value={formData.branch}
          onChange={handleInputChange}
        >
          <option value="">Select Branch</option>
          <option value="branch1">Branch 1</option>
          <option value="branch2">Branch 2</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <br />
      <label>
        Country Code:
        <select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
        >
          <option value="">Select Country Code</option>
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} - {country.name}
            </option>
          ))}
        </select>
      </label>
      <br />    
      <label>
      Mobile Number:
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
    <label>
      City:
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      State:
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Zip Code:
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <label>
      Address:
      <textarea
        name="address"
        value={formData.address}
        onChange={handleInputChange}
      ></textarea>
    </label>
    <br />
    <label>
      Credit Source:
      <input
        type="text"
        name="creditSource"
        value={formData.creditSource}
        onChange={handleInputChange}
      />
    </label>
    <br />
    <button type="submit">Submit</button>
  </form>  );
}

export default Register;
