import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingTable.css';

const API_URL = 'http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/'; // Replace with your backend URL

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Show 5 items per page

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_bookings.php`, {
        params: {
          page: currentPage,
          limit: itemsPerPage
        }
      });
      setBookings(response.data.bookings);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`${API_URL}/update_booking.php`, { id, status: 'Booked' });
      fetchBookings();
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.post(`${API_URL}/delete_booking.php`, { id });
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    
     
      <div className="main-container ">
      <h1>Manage Bookings</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Persons</th>
              <th>Room Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Days</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.address}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.persons}</td>
                <td>{booking.roomType}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.totalPrice}</td>
                <td>{booking.days}</td>
                <td>{booking.capacity}</td>
                <td>{booking.status}</td>
                <td>
                  <button onClick={() => handleAccept(booking.id)} className="action-btn">Accept</button>
                  <button onClick={() => handleDelete(booking.id)} className="action-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className='sagor'>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    
  );
};

export default BookingTable;
