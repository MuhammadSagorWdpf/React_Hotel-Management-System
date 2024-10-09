// src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetch_users.php');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      console.log(`Attempting to delete user with ID: ${userId}`); // Debugging
      const response = await axios.delete(`http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/delete_user.php?id=${userId}`);
      console.log('Delete response:', response.data); // Debugging
      if (response.data.success) {
        setSuccess('User deleted successfully');
        setError('');
        fetchUsers(); // Refresh the user list
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
      setSuccess('');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='main-container'>
    <div className="users-list">
      <h2>Users List</h2>
      {success && <div className="message success">{success}</div>}
      {error && <div className="message error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );

};

export default UserTable;
