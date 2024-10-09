import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/signup.php', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = response.data;
      if (result.success) {
        setSuccess(result.message);
        setError('');
      } else {
        setError(result.message);
        setSuccess('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up</h1>
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
       
      </div>
    </div>
  );
};

export default Signup;
