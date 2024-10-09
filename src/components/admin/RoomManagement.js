import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RoomManagement.css'; // Optional, for custom styling

const API_URL = 'http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend'; // Update to your backend URL

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/roomes.php`);
      console.log('API Response:', response.data); // Log response to debug

      if (response.data && response.data.success) {
        if (Array.isArray(response.data.data)) { // Adjust based on actual response
          setRooms(response.data.data); // Adjust based on the actual API response structure
        } else {
          setErrorMessage('Invalid response structure.');
        }
      } else {
        setErrorMessage('No rooms available.');
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Log the error
      setErrorMessage('Failed to fetch rooms.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const response = await axios.post(`${API_URL}/delete_room.php`, { id });

        if (response.data.success) {
          alert('Room deleted successfully!');
          fetchRooms(); // Refresh the list
        } else {
          alert('Failed to delete room.');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="main-container">
      <h2>Room Management</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Link to="/add-room">
        <button className="btn btn-primary">Add New Room</button>
      </Link>
      {rooms.length === 0 ? (
        <div>No rooms available.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Type</th>
              <th>Price</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomType}</td>
                <td>BDT {room.price}</td>
                <td>{room.details}</td>
                <td>
                  <Link to={`/edit-room/${room.id}`}>
                    <button className="btn btn-warning btn-sm">Edit</button>
                  </Link>
                  <button 
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomManagement;
