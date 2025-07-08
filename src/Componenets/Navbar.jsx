import React, { useState } from 'react';
import '../css/navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo"><span className="logo-e">E</span>duTrackr</div>
      <ul className="nav-links">
        <li><Link to ="/">Home</Link></li>
        <li><a href="#features" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a></li>
        <li><Link to="/login" id="login-btn">Login</Link></li> 
      </ul>
      
      <button
        className="navbar-hamburger"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
        style={{ background: "none", border: "none", color: "#1e40af", cursor: "pointer", marginLeft: "1rem", display: "none" }}
      >
        <FaBars size={24} color='#1e40af'/>
      </button>
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)}></div>
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
          style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", alignSelf: "flex-end", marginBottom: "2rem", cursor: "pointer" }}
        >
          <FaTimes size={24} />
        </button>
        <ul>
          <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
          <li><a href="#features" onClick={e => { e.preventDefault(); setSidebarOpen(false); setTimeout(() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>Features</a></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
