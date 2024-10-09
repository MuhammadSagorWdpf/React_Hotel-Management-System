import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyCards.css';
import { Link } from 'react-router-dom';

const MyCards = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/getRooms.php');
        console.log('API Response:', response.data);  // Log the response data
  
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setRooms(response.data);
        } else {
          console.error('Error fetching rooms: No valid data found');
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    fetchRooms();
  }, []);
  

  return (
    <div>
      <div className="containers">
        <center>
          <h1 className='featured-heading'>Featured Rooms</h1>
        </center>
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
      </div>
    </div>
  );
};

export default MyCards;
