import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import NavBar from "./nav-bar";
import UploadList from "../components/uploadList";
import UsageChart from "../components/usagechart";
import NotificationPanel from "../components/notificati";

import "../components/dashboard.css";

import { getUserName, whatnew } from "../api";

const Dashboard = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const darkMode = location.state?.darkMode;
  
  const [name, setName] = useState("User");
  const [allArticles, setAllArticles] = useState([]);

 useEffect(() => {
    if (userId) {
      getUserName(userId)
        .then((res) => setName(res.data.name))
        .catch((err) => {
          console.error("Failed to fetch user name:", err);
          setName("User");
        });
    }}, [userId]);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <NavBar
  userId={userId}
  darkMode={darkMode}
  name={name}
/>

      <div className="dashboard-main">
        <header className="greeting-card">
          <h2>Hello {name}!</h2>
          <p>Here's how your week looks like!</p>
          <div className="stats-row">
            <span className="dot purple" /> 7265 files uploaded
            <span className="dot blue" /> 3671 files downloaded
            <span className="dot green" /> 37% storage used
          </div>
        </header>

        <div className="main-cards">
          <UploadList articles={allArticles} />
          <UsageChart />
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;