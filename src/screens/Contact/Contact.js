import axios from 'axios';
import React, { useState } from 'react';
import './Contact.css';
import contactImg from '../../imgs/contact.jpg';
import MyFooter from '../../components/Footer/MyFooter';
import MyCopyright from '../../components/Copyright/MyCopyright';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/contacts.php',
        new URLSearchParams(formData).toString(), // Convert formData to URL-encoded string
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Set content type for URL-encoded data
          },
        }
      );
      setStatus(response.data); // Display success message or handle errors
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className='contactBody'>
      <section className='contactPage' style={{
        backgroundImage: `url(${contactImg})`,
        backgroundSize: 'cover'
      }}>
        <div className='content'>
          <h2 className='contact-us-hd'>Contact Us </h2>
          <p className='contact-us-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum maiores neque sunt accusamus numquam amet eos dolorem, unde ab impedit id odit temporibus voluptatibus minima beatae quis voluptas dolor repudiandae.</p>
        </div>

        <div className='mycontainer'>
          <div className='contactInfo'>
            <div className='box'>
              <div className='icon'>
                <i className='fa fa-map-marker' aria-hidden="true"></i>
              </div>
              <div className='text'>
                <h3>Address</h3>
                <p>Khilgaon,Dhaka-1219</p>
              </div>
            </div>

            <div className='box'>
              <div className='icon'>
                <i className='fa fa-phone' aria-hidden="true"></i>
              </div>
              <div className='text'>
                <h3>Phone</h3>
                <p>01568393086</p>
              </div>
            </div>

            <div className='box'>
              <div className='icon'>
                <i className='fa fa-envelope-o' aria-hidden="true"></i>
              </div>
              <div className='text'>
                <h3>Email</h3>
                <p>sagorwdpf@gmail.com</p>
              </div>
            </div>
          </div>

          <div className='contactForm'>
            <form onSubmit={handleSubmit}>
              <h2>Send Message</h2>
              <div className='inputBox'>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
                <span>Full Name</span>
              </div>
              <div className='inputBox'>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
                <span>Email</span>
              </div>
              <div className='inputBox'>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-input"
                ></textarea>
                <span>Type your message ...</span>
              </div>
              <div className='inputBox'>
                <input
                  type="submit"
                  value="Send"
                  className="contact-input"
                />
              </div>
              {status && <p>{status}</p>}
            </form>
          </div>
        </div>
      </section>
      <MyFooter />
      <MyCopyright />
    </div>
  );
};

export default Contact;
