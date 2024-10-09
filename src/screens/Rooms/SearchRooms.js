import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, MenuItem } from '@mui/material';
import './serachbar.css';
const MyCards = () => {
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetchRoomTypes.php');
        if (response.data.success) {
          setRoomTypes(response.data.data);
        } else {
          console.error('Error fetching room types:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    const fetchPriceRanges = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetchPriceRanges.php');
        if (response.data.success) {
          setPriceRanges(response.data.data);
        } else {
          console.error('Error fetching price ranges:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching price ranges:', error);
      }
    };

    fetchRoomTypes();
    fetchPriceRanges();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/searchsroomes.php', {
          params: {
            roomType,
            roomPrice
          }
        });
        console.log('API Response:', response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          setRooms(response.data.data);
        } else {
          console.error('Error fetching rooms: No valid data found');
          setRooms([]);
        }
      } catch (error) {
        console.error('There was an error!', error);
        setRooms([]);
      }
    };

    fetchRooms();
  }, [roomType, roomPrice]);

  const handleRoomChange = (event) => {
    setRoomType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setRoomPrice(event.target.value);
  };

  return (
    <div>
      <center className='main-container'>
        <div className="dropdown">
          <TextField
            className="search-room-input"
            id="outlined-select-room-type"
            select
            label="Room Type"
            value={roomType}
            onChange={handleRoomChange}
            fullWidth
          >
            <MenuItem value="">All Room Types</MenuItem>
            {roomTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="search-room-input"
            id="outlined-select-room-price"
            select
            label="Room Price"
            value={roomPrice}
            onChange={handlePriceChange}
            fullWidth
          >
            <MenuItem value="">All Price Ranges</MenuItem>
            {priceRanges.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </center>

      <div className="containers">
        <center>
          <h1 className='featured-heading'>All types of roome</h1>
        </center>
        {rooms.length > 0 ? (
          <div className='myCards'>
            {rooms.map(room => (
              <div className="card" key={room.id}>
                <div className="slide slide1">
                  <div className="content">
                    <div className="icon">
                      <img 
                        src={`http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/${room.image1}`} 
                        alt={room.roomType} 
                      />
                    </div>
                  </div>
                </div>
                <div className="slide slide2">
                  <div className="content">
                    <h3>{room.roomType}</h3>
                    <Link to={`/singleRoom/${room.id}`} className='links'>
                      <p>Click to book your room of your own choice</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
};

export default MyCards;
