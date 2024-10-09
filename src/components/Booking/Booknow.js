import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import MyCarousel from '../../components/Carousel/MyCarousel';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';
import './Booknow.css';

const fallbackImage = '/default-image.jpg';

const Booknow = () => {
  const { id } = useParams(); // Extract 'id' from URL parameters
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [persons, setPersons] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [availabilityError, setAvailabilityError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/roomes.php', {
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

  useEffect(() => {
    if (startDate && endDate && roomData) {
      const calculateDays = () => {
        const diffTime = endDate - startDate;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      };

      const days = calculateDays();
      setTotalDays(days);
      setTotalAmount(days * roomData.price);
    }
  }, [startDate, endDate, roomData]);

  const checkAvailability = async () => {
    if (!roomData) return false;
    
    try {
      const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/check_availability.php', {
        params: {
          roomType: roomData.roomType,
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString()
        }
      });

      if (response.data.available) {
        return true;
      } else {
        alert('Room is already booked for the selected dates.');
        return false;
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      alert('Failed to check room availability.');
      return false;
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!roomData) return alert("Room details are not available.");
    if (persons <= 0 || persons > roomData.capacity) {
      return alert("Please check the number of persons. It should be greater than 0 and within the room's capacity.");
    }
    if (totalDays <= 0) {
      return alert("Please select valid start and end dates.");
    }
    if (name && address && cnic && email && phone && startDate && endDate) {
      const isAvailable = await checkAvailability();
      if (!isAvailable) return;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('cnic', cnic);
      formData.append('address', address);
      formData.append('email', email);
      formData.append('persons', persons);
      formData.append('roomType', roomData.roomType);
      formData.append('startDate', startDate.toLocaleDateString());
      formData.append('endDate', endDate.toLocaleDateString());
      formData.append('totalPrice', totalAmount);
      formData.append('days', totalDays);
      formData.append('capacity', roomData.capacity);
      formData.append('status', 'Pending');

      try {
        const response = await axios.post('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/bookings.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          alert('Booking Successful! You can view your bookings.');
          navigate('/');
        } else {
          alert('Failed to book: ' + (response.data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Failed to book. Please try again later.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!roomData) return <p>No room data available</p>;

  const imageUrl = roomData.image1
    ? `http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/${roomData.image1}`
    : fallbackImage;

  return (
    <div>
      <MyCarousel title={`${roomData.roomType} Room`} />
      <center>
        <h1 className='room-details-heading'>Book a {roomData.roomType} Room</h1>
      </center>
      <div className='singleRoom-cards'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt={roomData.roomType} />
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
            Price: BDT {roomData.price} <br /><br />
            Size: {roomData.size} <br /><br />
            Max Capacity: {roomData.capacity} Person <br /><br />
            Pets: {roomData.pets ? 'Allowed' : 'Not Allowed'} <br /><br />
            Free Breakfast: {roomData.breakfast ? 'Included' : 'Not Included'} <br /><br />
          </p>
        </div>
      </div>

      <div className='booking-form'>
        <h1>Book Now</h1>
        {availabilityError && <p className="error-message">{availabilityError}</p>}
        <div className='form-group'>
          <label htmlFor="name">Name</label>
          <input
            name='name'
            type="text"
            className="form-control"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="address">Address</label>
          <input
            name='address'
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            placeholder="Your address"
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="cnic">CNIC Number</label>
          <input
            name='cnic'
            type="text"
            className="form-control"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            id="cnic"
            placeholder="CNIC"
            maxLength={13}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name='email'
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Your email"
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            name='phone'
            defaultCountry="BD"
            className="form-control"
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
          />
        </div>

        <div className='form-group'>
          <label htmlFor="persons">Number of Persons</label>
          <input
            name='persons'
            type="number"
            className="form-control"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            id="persons"
            min="1"
            max={roomData.capacity}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="startDate">Check-in Date</label>
          <DatePicker
            name='startDate'
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            id="startDate"
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="endDate">Check-out Date</label>
          <DatePicker
            name='endDate'
            className="form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            id="endDate"
            dateFormat="yyyy/MM/dd"
            required
          />
        </div>

        <div className='form-group'>
          <label>Total Days</label>
          <p>{totalDays} days</p>
        </div>

        <div className='form-group'>
          <label>Total Amount</label>
          <p>BDT {totalAmount}</p>
        </div>

        <button className='confirm-booking-btn' onClick={handleBooking}>Confirm Booking</button>
      </div>

      <MyFooter />
      <MyCopyright />
    </div>
  );
};

export default Booknow;
