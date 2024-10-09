import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MyCarousel from '../../components/Carousel/MyCarousel';
import './Rooms.css';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';

// Fallback image URL
const fallbackImage = '/default-image.jpg';

const SingleRoom = () => {
  const { id } = useParams(); // Extract 'id' from URL parameters
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/roomes.php?id', {
          params: { id }
        });

        if (response.data.error) {
          setError(response.data.error);
          setRoomData(null);
        } else {
          setRoomData(response.data);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch room data');
        setRoomData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!roomData) return <p>No room data available</p>;

  // Construct the full URL for the images
  const imageUrl1 = roomData.image1
    ? `http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/${roomData.image1}`
    : fallbackImage;
  const imageUrl2 = roomData.image2
    ? `http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/${roomData.image2}`
    : fallbackImage;
  const imageUrl3 = roomData.image3
    ? `http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/${roomData.image3}`
    : fallbackImage;

  return (
    <div>
      <MyCarousel title={`${roomData.roomType} Room`} />
      <center>
        <h1 className='room-details-heading'>Details of {roomData.roomType} Room</h1>
      </center>
      <div className='singleRoom-cards'>
        <div className="card">
          <img src={imageUrl1} className="card-img-top" alt={`${roomData.roomType} Image 1`} />
        </div>

        <div className="card">
          <img src={imageUrl2} className="card-img-top" alt={`${roomData.roomType} Image 2`} />
        </div>

        <div className="card">
          <img src={imageUrl3} className="card-img-top" alt={`${roomData.roomType} Image 3`} />
        </div>
      </div>

      <div className='single-room-detail'>
        <div className='single-room-detail-para'>
          <h1>Details</h1> 
          <p>{roomData.details}</p>
        </div>

        <div className='single-room-detail-list'>
          <h1>Info</h1>
          <p>
            Price: Rs {roomData.price} <br /><br />
            Size: {roomData.size} <br /><br />
            Max Capacity: {roomData.capacity} Person <br /><br />
            Pets: {roomData.pets ? 'Allowed' : 'Not Allowed'} <br /><br />
            Free Breakfast: {roomData.breakfast ? 'Included' : 'Not Included'} <br /><br />
          </p>
        </div>
      </div>

      <div className='single-room-detail'>
        <div className='single-room-detail-list2'>
          <h1></h1>
          <p>
            <h1>Extras</h1><br/>
            {roomData.extrac_2}<br />
            "Soft Towel" <br />
            "AC" <br />
          </p>
        </div>

        <div className='single-room-detail-list2'>
          <h1 className='white'>Extras</h1>
          <p>
          <h1>Extras</h1><br/>
            {roomData.extrac_2}<br />
            "Amazing view" <br />
            "Internet" <br />
          </p>
        </div>

        <div className='single-room-detail-list2'>
          <h1 className='white'>Extras</h1>
          <p>
          <h1>Extras</h1><br/>
            {roomData.extrac_3}<br />
            Complimentary refreshments <br />
            "Adequate safety/security" <br />
          </p>
        </div>
      </div>

      <center>
        <div>
        <Link to={`/booknow/${id}`}>
  <button className='btn bookNow-btn'>Book Now</button>
</Link>
        </div>
      </center>

      <MyFooter />
      <MyCopyright />
    </div>
  );
};

export default SingleRoom;
