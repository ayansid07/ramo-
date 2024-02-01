import React, { useState } from 'react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    mealPreference: 'both',
  });

  const [focusState, setFocusState] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    address: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (name) => {
    setFocusState({
      ...focusState,
      [name]: true,
    });
  };

  const handleBlur = (name) => {
    setFocusState({
      ...focusState,
      [name]: false,
    });
  };

  const renderInputField = (label, name, type = 'text') => (
    <div className="mb-4">
      <div className={`relative w-full min-w-[200px] h-12 ${focusState[name] ? 'border-green-500' : 'border-violet-800'}`}>
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => handleFocus(name)}
          onBlur={() => handleBlur(name)}
          className="peer w-full h-full bg-transparent text-blue-gray-900 font-sans font-bold 
          outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all 
          placeholder-shown:border placeholder-shown:border-blue-gray-600 placeholder-shown:border-t-blue-gray-700 
          border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] 
          border-blue-gray-200 focus:border-gray-900"
          required
        />

        <label
          htmlFor={name}
          className={`flex w-full h-full select-none pointer-events-none absolute left-0 font-bold 
          !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight 
          peer-focus:leading-tight peer-disabled:text-transparent 
          peer-disabled:peer-placeholder-shown:text-blue-gray-500 
          transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] 
          before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] 
          before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
          peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none 
          before:transition-all peer-disabled:before:border-transparent after:content[' '] 
          after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] 
          after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t 
          peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none 
          after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75]
          text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900
          after:border-blue-gray-200 peer-focus:after:!border-gray-900`}
        >
          {label}
        </label>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='m-6'>
      <div className='w-full h-full flex items-center justify-center mb-28'>
        <form className='max-w-md w-full bg-opacity-75 backdrop-blur-md bg-gray-300 rounded-3xl p-8 shadow-md ' onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Sign Up</h2>

          {renderInputField('Name', 'name')}
          {renderInputField('Email', 'email', 'email')}
          {renderInputField('Password', 'password', 'password')}
          {renderInputField('Confirm Password', 'confirmPassword', 'password')}
          {renderInputField('Phone Number', 'phone', 'tel')}
          {renderInputField('Address', 'address', 'textarea')}
          
          <div className='mb-4'>
            <label className='block text-gray-700 text-lg font-bold mb-2'>Meal Preference</label>
            <div>
              {/* Radio buttons go here */}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-green-700 text-white p-2 rounded-md w-full hover:bg-green-400 focus:outline-none focus:shadow-outline-blue transition-all duration-300'
          >
            Sign Up
          </button>

          {/* Already have an account - Login Link */}
          <p className='mt-4 text-gray-600 text-center'>
            Already have an account? <a href='/login' className='text-blue-500'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
