import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUpload, FiSearch, FiBell, FiSettings, FiMoreVertical } from 'react-icons/fi';
import { FaFileCsv } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import './dashboard.css'; 
import { FiUser } from "react-icons/fi";


{/*
 import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getUserName, files } from "../api";


export default function Dashboard() {
  
    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const darkMode = location.state?.darkMode;
  const userId = location.state?.userId;
  
    const [name, setName] = useState("User");
    const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
      if (userId) {
        getUserName(userId)
          .then((res) => setName(res.data.name))
          .catch(() => setName("User"));
      }
  
      files()
        .then((res) => {
          const all = res.data || [];
          setAllArticles(all);
        })
        .catch((err) => console.error("Failed to fetch articles:", err));
    }, [userId]);
  return (
    <div>
      <nav className="nav flex w-full flex-row container-fluid ">
            <img id="sm-lg" src="/search_res_lo.png" alt="Logo" />
            <div className="nav-btn-div">
              <button
                id="lt"
                className="btn nav-btn btn-nav flex w-full flex-row"
                onClick={() =>
                  navigate("/Notification", {
                    state: { userId, darkMode, keyword: "recently_viewed" },
                  })
                }
              >
               <span>
               <img src={darkMode ? "/Recently_Viewed_dark.png" : "/Recently Viewed.png"} alt="Notification" />
               </span> <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>Notification</span>
              </button>

              <button
                className="btn nav-btn btn-nav"
                onClick={() =>
                  navigate("/Setting", {
                    state: { userId, darkMode, keyword: "favorites" },
                  })
                }
              >
                <img src={darkMode ? "/Favorites_dark.png" : "/Favorites.png"} alt="Setting" />
                <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>Setting</span>
              </button>

              <button className="btn nav-btn btn-nav"
              onClick={() =>
                navigate("/Dashboard", {
                  state: { userId, darkMode },
                })
              }>
                <img src={darkMode ? "/log_in_dark.png" : "/Log In.png"} alt="Profile" />
                <span className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}>{name}</span>
              </button>
            </div>
          </nav>
    </div>
  );
}
*/}


const data = [
  { week: 'Week 1', uploads: 28 },
  { week: 'Week 2', uploads: 58 },
  { week: 'Week 3', uploads: 35 },
  { week: 'Week 4', uploads: 55 },
];

const files = [
  { icon: <FaFileCsv />, title: "Water Scarcity: Global Data Trends & Solutions" },
  { icon: <IoDocumentTextOutline />, title: "Renewable Energy Adoption in Developing Countries" },
  { icon: <IoDocumentTextOutline />, title: "The Impact Emissions on Climate Change" },
  { icon: <IoDocumentTextOutline />, title: "Environmental Data Modeling for Carbon Footprint Reduction" },
  { icon: <IoDocumentTextOutline />, title: "Waste Management: Using Big Data to Tackle Pollution" },
  { icon: <IoDocumentTextOutline />, title: "Sustainability Reports: ESG Metrics in 2023" },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button><FiUpload /> Dashboard</button>
        <button><FiSearch /> Search</button>
        <button><FiUpload /> My Files</button>
        <button> 
<FiUser />
 Profile</button>
      </div>
      <div className="main-panel">
        <div className="header">
          <input type="text" placeholder="Search here" />
          <div>
            <FiBell />
            <FiSettings />
          </div>
        </div>
        <div className="greeting">
          <h2>Hello Satoshi!</h2>
          <p>Here's how your week looks like!</p>
          <p>🔵 7265 files uploaded 🔵 3671 files downloaded 🟢 37% storage used</p>
        </div>
        <div className="uploads">
          <h3>Current Uploads</h3>
          <ul>
            <li>📄 Water Scarcity: Global Data Trends & Solutions</li>
            <li>📄 Renewable Energy Adoption in Developing Countries</li>
            {/* Add more items */}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
