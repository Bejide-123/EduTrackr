import React, { useState } from 'react';
import {
  FaChartBar, FaClock, FaFire, FaTrophy, FaBars, FaTimes
} from 'react-icons/fa';
import '../css/Sidebar.css'; 

const Sidebar = ({ activeTab, onTabClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'course', label: 'Course Progress', icon: <FaChartBar /> },
    { id: 'study', label: 'Weekly Study Time', icon: <FaClock /> },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
    { id: 'milestones', label: 'Milestones', icon: <FaFire /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
)}


      <aside className={`sidebars ${isOpen ? 'open' : ''}`}>
  {isOpen && (
    <button className="close-btn" onClick={() => setIsOpen(false)}>
      <FaTimes />
    </button>
  )}

  <div className="sidebar-tabs-wrapper">
    {tabs.map(tab => (
      <div
        key={tab.id}
        className={`sidebars-tab ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => {
          onTabClick(tab.id);
          setIsOpen(false);
        }}
      >
        <span className="icon">{tab.icon}</span>
        <span className="label">{tab.label}</span>
      </div>
    ))}
  </div>
</aside>


    </>
  );
};

export default Sidebar;
