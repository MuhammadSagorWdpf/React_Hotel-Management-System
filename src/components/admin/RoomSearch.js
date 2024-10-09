import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomSearch = ({ onRoomsFetched }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [price, setPrice] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);

  useEffect(() => {
    // Fetch room types for the dropdown
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetch_room_types.php');
        setRoomTypes(response.data);
      } catch (err) {
        console.error('Error fetching room types:', err);
      }
    };
    
    fetchRoomTypes();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/search_rooms.php', {
        params: {
          roomType: selectedRoomType,
          price
        }
      });
      if (response.data.success) {
        onRoomsFetched(response.data.rooms);
      } else {
        console.error('Error fetching rooms:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="room-search">
      <div className="search-form">
        <label>Room Type:
          <select value={selectedRoomType} onChange={(e) => setSelectedRoomType(e.target.value)}>
            <option value="">Select Room Type</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter maximum price"
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default RoomSearch;
