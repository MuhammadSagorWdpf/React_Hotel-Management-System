// src/pages/AddCategory.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddCategory.css'; // Optional, for custom styling

const API_URL = 'http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/add_category.php'; // Replace with your backend URL

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous errors
    setNameError('');
    setDescriptionError('');
    setSuccessMessage('');
    setErrorMessage('');

    // Validate form
    if (!name) {
      setNameError('Please enter a category name.');
      return;
    }
    if (!description) {
      setDescriptionError('Please enter a description.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/add_category.php`, {
        name,
        description
      });

      if (response.data.success) {
        setSuccessMessage('Category added successfully!');
        setName('');
        setDescription('');
      } else {
        setErrorMessage('Failed to add category.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="main-container">
      <h2>Add New Category</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control ${nameError ? 'is-invalid' : ''}`}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`form-control ${descriptionError ? 'is-invalid' : ''}`}
          />
          {descriptionError && <div className="invalid-feedback">{descriptionError}</div>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">Add Category</button>
        </div>

        
      </form>
    </div>
  );
};

export default AddCategory;
