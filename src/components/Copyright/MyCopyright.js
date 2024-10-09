import React from 'react'
import './MyCopyright.css'
const MyCopyright = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <div className='copyrightBar'>
        <p>All rights reserved &copy; {currentYear} Muhammad Sagor</p>
      </div>
    );
  };

export default MyCopyright