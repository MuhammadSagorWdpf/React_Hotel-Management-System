import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Optional: Add CSS for styling the table

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/fetch_rooms.php');
        if (response.data.success === false) {
          throw new Error(response.data.error);
        }
        setData(response.data.data); // Adjust according to response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="data-table-container">
      <h1>Room Data Table</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Details</th>
            <th>Price</th>
            <th>Size</th>
            <th>Capacity</th>
            <th>Pets Allowed</th>
            <th>Breakfast Included</th>
            <th>Extra 1</th>
            <th>Extra 2</th>
            <th>Extra 3</th>
            <th>Room Type</th>
            <th>Image 1</th>
            <th>Image 2</th>
            <th>Image 3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.details}</td>
              <td>{item.price}</td>
              <td>{item.size}</td>
              <td>{item.capacity}</td>
              <td>{item.pets ? 'Yes' : 'No'}</td>
              <td>{item.breakfast ? 'Yes' : 'No'}</td>
              <td>{item.extrac_1}</td>
              <td>{item.extrac_2}</td>
              <td>{item.extrac_3}</td>
              <td>{item.roomType}</td>
              <td><img src={`http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/uploads/${item.image1}`} alt="Image 1" width="100" /></td>
              <td><img src={`http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/uploads/${item.image2}`} alt="Image 2" width="100" /></td>
              <td><img src={`http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/uploads/${item.image3}`} alt="Image 3" width="100" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
