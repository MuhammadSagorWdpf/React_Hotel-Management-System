import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, Rectangle, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'; // Import axios for HTTP requests
import './AdminApp.css';
function AdminHome() {
  const [roomCount, setRoomCount] = useState(0); 
  const[userCount,setUserCount]=useState(0);
  const[categoryCount,setcategoryCount]=useState(0);// State for storing room count
  
  useEffect(()=>{
    async function fetchCategoryCont(){
      try{
        const response=await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/category_count.php');
        console.log(response.data);
        setcategoryCount(response.data.count || 0);
      }
      catch(error){
        console.error('Error fetching room count:', error);
      }
    }
    fetchCategoryCont();
  },[]);

  useEffect(() => {
    async function fetchRoomCount() {
      try {
        const response = await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/count.php');
        console.log(response.data); // Log the response data for debugging
        // Adjust based on the actual response structure
        setRoomCount(response.data.count || 0); 
      } catch (error) {
        console.error('Error fetching room count:', error);
      }
    }
    fetchRoomCount();
  }, []);

  useEffect(()=>{
    async function fetchUserCount(){
      try{
        const response=await axios.get('http://localhost/HOTEL-MANAGEMENT-SYSTEM-master/backend/user_count.php');
        console.log(response.data);
        setUserCount(response.data.count||0);
      }
      catch(error){
        console.error('Enter fetching room count:',error);
      }
    }
    fetchUserCount();
  },[]);



  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className="main-container mybody">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="cards">
          <div className="card-inner">
            <h3>Room</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{roomCount}</h1> {/* Display fetched room count */}
        </div>

        <div className="cards">
          <div className="cards-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{categoryCount}</h1>
        </div>

        <div className="cards">
          <div className="cards-inner">
            <h3>CUSTOMERS</h3>
          
          {/*   <BsPeopleFill className="card_icon" /> */}
          </div>
          <h1>{userCount}</h1>
        </div>

   {/*      <div className="card">
          <div className="cards-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div> */}
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminHome;
