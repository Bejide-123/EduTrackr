import React, { useState } from 'react';
import '../css/Navbar2.css';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo"><span className="logo-e">E</span>duTrackr</div>

      <ul className="nav-links">
        <li><Link to="/welcome">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/progress" id="progress-link">Progress</Link></li>
        <li><IoMdNotificationsOutline size={32} color="#1e40af" /></li>
      </ul>

      
      <div className="navbar-icons">
        <div className="user-dropdown">
          <button
            id="user-icon-btn"
            onClick={() => setDropdownOpen(open => !open)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer"
            }}
            aria-label="User menu"
          >
            <FaUserCircle size={28} color="#1e40af" id="user-icon" />
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => { setDropdownOpen(false); navigate("/profile"); }}>
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => { setDropdownOpen(false); navigate("/change-password"); }}>
                  Change Password
                </button>
              </li>
              <li>
                <button onClick={() => { setDropdownOpen(false); alert("In development") }}> 
                  Settings
                </button>
              </li>
              <li>
                  <button
                    id="logout"
                    onClick={() => {
                      setDropdownOpen(false);
                    navigate("/login");
                    }}
                  >
                    Logout
                  </button>
              </li>
            </ul>
          )}
        </div>
        <button
          className="navbar-hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
          style={{
            background: "none",
            border: "none",
            color: "#1e40af",
            cursor: "pointer",
            marginLeft: "1rem"
          }}
        >
          <FaBars size={24} color='#1e40af'/>
        </button>
      </div>

      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            alignSelf: "flex-end",
            marginBottom: "2rem",
            cursor: "pointer"
          }}
        >
          <FaTimes size={24} />
        </button>
        <ul>
          <li><Link to="/welcome" onClick={() => setSidebarOpen(false)}>Dashboard</Link></li>
          <li><Link to="/courses" onClick={() => setSidebarOpen(false)}>Courses</Link></li>
          <li><Link to="/schedule" onClick={() => setSidebarOpen(false)}>Schedule</Link></li>
          <li><Link to="/progress" onClick={() => setSidebarOpen(false)}>Progress</Link></li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;