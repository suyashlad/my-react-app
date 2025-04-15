import React, { useState,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import "./nav-bar.css";

import { getUserName, whatnew } from "../api";

const NavBar = ({ userId, darkMode}) => {
  const navigate = useNavigate();
  
    const [name, setName] = useState("User");
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
    <div className="nav-btn-div flex gap-4 p-4 bg-transparent">
      <button
        id="lt1"
        className="btn nav-btn btn-nav flex items-center px-4 py-2 rounded-md hover:bg-gray-200 transition"
        onClick={() =>
          navigate("/notification", {
            state: { userId, darkMode },
          })
        }
      >
        <img
          src={darkMode ? "/Recently_Viewed_dark.png" : "/notification_light.png"}
          alt="Notification"
          className="w-6 h-6"
        />
        <span className={`mx-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
         Notification
        </span>
      </button>

      <button
        className="btn nav-btn btn-nav flex items-center px-4 py-2 rounded-md hover:bg-gray-200 transition"
        onClick={() =>
          navigate("/setting", {
            state: { userId, darkMode },
          })
        }
      >
        <img
          src={darkMode ? "/Favorites_dark.png" : "/settings.png"}
          alt="favorites"
          className="w-6 h-6"
        />
        <span className={`mx-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Setting
        </span>
      </button>

      <button
        className="btn nav-btn btn-nav flex items-center px-4 py-2 rounded-md hover:bg-gray-200 transition"
        onClick={() =>
          navigate("/dashboard", {
            state: { userId, darkMode },
          })
        }
      >
        <img
          src={darkMode ? "/log_in_dark.png" : "/Log In.png"}
          alt="Profile"
          className="w-6 h-6"
        />
        <span className={`mx-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {name}
        </span>
      </button>
    </div>
  );
};

export default NavBar;
