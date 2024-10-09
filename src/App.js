import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { UserAuthContextProvider } from './Context/UserAuthContext';

import Home from './screens/Home/Home';
import About from './screens/About/About';
import Contact from './screens/Contact/Contact';
import Rooms from './screens/Rooms/Rooms';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import SingleRoom from './screens/Rooms/SingleRoom';
import Booknow from './components/Booking/Booknow';
import MyBookings from './components/Booking/MyBookings';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import ProtectedRoute from './components/ProtectedRoutes';

import FetchBookingInformation from './components/admin/FetchBookingInformation';
import BackendData from './components/admin/BackendData';
import CategoryAdded from './components/admin/CategoryAdded';
import RoomManagement from './components/admin/RoomManagement';
import EditRoom from './components/admin/EditRoom';

import UserManage from './components/admin/UserManage';
 // Updated import path

// Import your Error component if needed

function App() {
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')||location.pathname.startsWith('/add-room')|| location.pathname.startsWith('/booking-table') || location.pathname.startsWith('/category-add') || location.pathname.startsWith('/usertable')) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/booknow/:id" element={
          <ProtectedRoute>
            <Booknow />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/singleRoom/:id" element={<SingleRoom />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminPanel />} />
        {/* Add a route for the RoomForm component */}
        <Route path="/add-room" element={<BackendData />} />
        <Route path="/booking-table" element={<FetchBookingInformation/>}/>
        <Route path="/category-add" element={<CategoryAdded/>}/>
        <Route path="/room-management" element={<RoomManagement/>}/>
        <Route path="/edit-room" element={<EditRoom/>}/>
        {/* Add a catch-all route if you have an Error component */}
        {/* <Route path="*" element={<Error />} /> */}


        <Route path="/usertable" element={<UserManage/>}/>
      </Routes>
      {/* Add your Footer component if needed */}
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}
