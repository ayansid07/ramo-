import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Internal Server Error');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <Link to="/register">Register</Link> {/* Link to the Register page */}
      </div>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link> {/* Link to the Forgot Password page */}
      </div>
    </div>
  );
};

export default Login;
