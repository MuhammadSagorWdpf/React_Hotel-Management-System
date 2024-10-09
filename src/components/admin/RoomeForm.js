import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './roomform.css';

const RoomForm = () => {
  const [formData, setFormData] = useState({
    details: '',
    price: '',
    size: '',
    capacity: '',
    pets: '',
    breakfast: '',
    extrac_1: '',
    extrac_2: '',
    extrac_3: '',
    roomType: '',
    image1: null,
    image2: null,
    image3: null
  });

  const [roomTypes, setRoomTypes] = useState([]);
  const [detailsOptions, setDetailsOptions] = useState([]);

  // Fetch room types when the component mounts
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetch_categories.php');
        setRoomTypes(response.data);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, []);

  // Fetch details based on selected room type
  useEffect(() => {
    const fetchDetails = async () => {
      if (formData.roomType) {
        try {
          const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetch_description.php', {
            params: { roomType: formData.roomType }
          });
          setDetailsOptions(response.data);
          setFormData(prevState => ({
            ...prevState,
            details: response.data[0] || '' // Assuming the first item is used
          }));
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      }
    };

    fetchDetails();
  }, [formData.roomType]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0] // Store the selected file
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.details || !formData.price || !formData.size || !formData.capacity || !formData.roomType) {
      alert('Please fill out all required fields.');
      return;
    }

    const postData = new FormData();
    postData.append('details', formData.details);
    postData.append('price', formData.price);
    postData.append('size', formData.size);
    postData.append('capacity', formData.capacity);
    postData.append('pets', formData.pets.toLowerCase() === 'yes' ? 1 : 0);
    postData.append('breakfast', formData.breakfast.toLowerCase() === 'yes' ? 1 : 0);
    postData.append('extrac_1', formData.extrac_1);
    postData.append('extrac_2', formData.extrac_2);
    postData.append('extrac_3', formData.extrac_3);
    postData.append('roomType', formData.roomType);
    if (formData.image1) {
      postData.append('image1', formData.image1); // Append image1 file
    }
    if (formData.image2) {
      postData.append('image2', formData.image2); // Append image2 file
    }
    if (formData.image3) {
      postData.append('image3', formData.image3); // Append image3 file
    }

    try {
      const response = await axios.post('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/insertRoom.php', postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setFormData({
          details: '',
          price: '',
          size: '',
          capacity: '',
          pets: '',
          breakfast: '',
          extrac_1: '',
          extrac_2: '',
          extrac_3: '',
          roomType: '',
          image1: null,
          image2: null,
          image3: null
        });
        alert('Room added successfully');
      } else {
        alert('Failed to add room: ' + response.data.error);
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('There was an error adding the room. Please try again.');
    }
  };

  return (
    <div className="main-container">
      <h1>Add Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Details:</label>
          <input
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            readOnly // Make it read-only or you can hide it
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Size:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pets Allowed:</label>
          <input
            type="text"
            name="pets"
            value={formData.pets}
            onChange={handleChange}
            placeholder="Yes or No"
          />
        </div>
        <div className="form-group">
          <label>Breakfast Included:</label>
          <input
            type="text"
            name="breakfast"
            value={formData.breakfast}
            onChange={handleChange}
            placeholder="Yes or No"
          />
        </div>
        <div className="form-group">
          <label>Extra :</label>
          <input
            type="text"
            name="extrac_1"
            value={formData.extrac_1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Extra 2:</label>
          <input
            type="text"
            name="extrac_2"
            value={formData.extrac_2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Extra 3:</label>
          <input
            type="text"
            name="extrac_3"
            value={formData.extrac_3}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image 1:</label>
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image 2:</label>
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image 3:</label>
          <input
            type="file"
            name="image3"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default RoomForm;
