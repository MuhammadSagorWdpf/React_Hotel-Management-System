import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './submenu.css';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsChatLeftText,BsBank2,BsColumnsGap
} from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { IoIosLogOut } from "react-icons/io";



import MessagesModal from '../../components/MessagesModal';

function Sidebar({ openSidebarToggle, openSidebar }) {
  const navigate = useNavigate();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleShowMessage = () => setShowMessageModal(true);
  const handleCloseMessage = () => setShowMessageModal(false);

  // Code for Fetching the total number of unread messages from the server
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/unreadMessages.php');
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error("There was an error fetching data", error);
      }
    };

    fetchUnreadCount();

    const intervalId = setInterval(fetchUnreadCount, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  // State to manage the submenu
  const [isRoomsSubmenuOpen, setIsRoomsSubmenuOpen] = useState(false);

  // Toggle function for the submenu
  const handleRoomsClick = () => {
    setIsRoomsSubmenuOpen(!isRoomsSubmenuOpen);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsBank2 className="icon-header" /> Hotel
        </div>

        <span className="icon close_icon" onClick={openSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={handleRoomsClick}>
          <a href="#">
            <BsBank2  className="icon" /> Rooms
            <span className="icon arrow">
              {isRoomsSubmenuOpen ? '▲' : '▼'}
            </span>
          </a>
          {isRoomsSubmenuOpen && (
            <ul className="submenu">
              <li>
                <Link to="/add-room">Add Room</Link>
              </li>
              <li>
                <Link to="/booking-table">Booking </Link>
              </li>
              
            </ul>
          )}
        </li>

        <li className="sidebar-list-item" >
          <a href="">
          <BsColumnsGap  className="icon" /> 
          <Link to="/category-add">Added Categories</Link>
          </a>
         
        </li>

        <li className="sidebar-list-item">
          <Link to="/usertable">
            <BsPeopleFill className="icon" /> Users
          </Link>
        </li>

        <li className="sidebar-list-item">
         
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsChatLeftText className="icon" /> Feedback
            <sup><span className="badge badge-danger rounded-pill">{unreadCount}</span></sup>
            <a className="btn btn-warning btn-sm" onClick={handleShowMessage}>View Messages</a>
            <MessagesModal show={showMessageModal} handleClose={handleCloseMessage} />
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Settings
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="" onClick={logout}>
            <IoIosLogOut className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
