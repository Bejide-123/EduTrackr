import React from "react";
import Navbar from "../Componenets/Navbar2";
import "../css/settings.css";
import { useState } from "react";
import {
  FaCogs,
  FaBell,
  FaUserShield,
  FaSlidersH,
  FaShieldAlt,
  FaLanguage,
  FaMoon,
  FaEye,
  FaLock,
  FaKey,
  FaClock,
  FaCalendarAlt,
  FaUserSecret,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdSettings } from "react-icons/md";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general"); // default
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  //  const [userFirstName, setUserFirstName] = useState("");

  // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  //   if (loginInfo && loginInfo.name) {
  //     setUserFirstName(loginInfo.name);
  //   }

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId); // for highlighting
    }
  };

  return (
    <>
      <Navbar />
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <button
        className={`sidebar-toggle ${isSidebarOpen ? "hide" : ""}`}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className="edutrackr-settings-page">
        <div className="edutrackr-settings-container">
          <aside className={`edutrackr-sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="edutrackr-logo">
              <span className="edutrackr-logo-e">E</span>duTrackr
            </div>

            <ul className="edutrackr-sidebar-menu">
              <li
                className={activeTab === "general" ? "active" : ""}
                onClick={() => {
                  setActiveTab("general"),
                    handleScrollToSection("general"),
                    setIsSidebarOpen(false);
                }}
              >
                General
              </li>
              <li
                className={activeTab === "notifications" ? "active" : ""}
                onClick={() => {
                  setActiveTab("notifications"),
                    handleScrollToSection("notifications"),
                    setIsSidebarOpen(false);
                }}
              >
                Notifications
              </li>
              <li
                className={activeTab === "privacy" ? "active" : ""}
                onClick={() => {
                  setActiveTab("privacy"),
                    handleScrollToSection("privacy"),
                    setIsSidebarOpen(false);
                }}
              >
                Privacy
              </li>
              <li
                className={activeTab === "preferences" ? "active" : ""}
                onClick={() => {
                  setActiveTab("preferences"),
                    handleScrollToSection("preferences"),
                    setIsSidebarOpen(false);
                }}
              >
                Preferences
              </li>
              <li
                className={activeTab === "security" ? "active" : ""}
                onClick={() => {
                  setActiveTab("security"),
                    handleScrollToSection("security"),
                    setIsSidebarOpen(false);
                }}
              >
                Security
              </li>
            </ul>

            <div className="edutrackr-sidebar-profile">
              <img
                src="https://ui-avatars.com/api/?name=User+Name&background=4F9CF9&color=fff"
                alt="User Avatar"
                className="edutrackr-avatar"
              />
              <div className="edutrackr-user-info">
                <p className="edutrackr-user-name">User name</p>
                <p className="edutrackr-user-role">Student</p>
              </div>
            </div>
          </aside>

          <main className="edutrackr-main-options">
            <div className="edutrackr-main-header">
              <h1 className="edutrackr-main-title">Settings</h1>
            </div>
            <div className="edutrackr-main-body">
              <div id="general" className="settings-section">
                <h2>
                  <MdSettings /> General Settings
                </h2>

                <div className="setting-item">
                  <label>Display Name</label>
                  <input type="text" placeholder="Fiyin" />
                </div>

                <div className="setting-item">
                  <label>App Name</label>
                  <input type="text" placeholder="EduTrackr" />
                </div>

                <div className="setting-item">
                  <label>Default Dashboard View</label>
                  <select>
                    <option>Overview</option>
                    <option>Courses</option>
                    <option>Schedule</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Time Zone</label>
                  <select>
                    <option>Africa/Lagos (GMT+1)</option>
                    <option>UTC</option>
                    <option>Europe/London</option>
                    <option>America/New_York</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Start Week On</label>
                  <select>
                    <option>Monday</option>
                    <option>Sunday</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Date Format</label>
                  <select>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div id="notifications" className="settings-section">
                <h2>
                  <IoMdNotificationsOutline /> Notifications
                </h2>

                {/* System Notifications */}
                <h3 className="notification-group-title">
                  System Notifications
                </h3>

                <div className="setting-item toggle-group">
                  <label>Enable Browser Notifications</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>Email Notifications</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>App Reminders</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>System Maintenance Alerts</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>Security Updates</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                {/* Learning Notifications */}
                <h3 className="notification-group-title">
                  Learning Notifications
                </h3>

                <div className="setting-item toggle-group">
                  <label>Weekly Study Reminders</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>New Course Alerts</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>Course Completion Alerts</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item toggle-group">
                  <label>Upcoming Deadline Alerts</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div id="privacy" className="settings-section">
                <h2>
                  <FaUserSecret /> Privacy
                </h2>
                <div className="setting-item">
                  <label>
                    <FaEye /> Make Profile Public
                  </label>
                  <input type="checkbox" />
                </div>
                <div className="setting-item">
                  <label>
                    <FaEye /> Show Activity Status
                  </label>
                  <input type="checkbox" />
                </div>
                <div className="setting-item">
                  <label>
                    <FaUserSecret /> Include in Search Results
                  </label>
                  <input type="checkbox" />
                </div>
                <div className="setting-item">
                  <label>
                    <FaUserSecret /> Share Data with Partners
                  </label>
                  <input type="checkbox" />
                </div>
              </div>

              <div id="preferences" className="settings-section">
                <h2>
                  <FaSlidersH /> Preferences
                </h2>
                <div className="setting-item">
                  <label>
                    <FaMoon /> Theme
                  </label>
                  <select>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>
                    <FaLanguage /> Language
                  </label>
                  <select>
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>
                    <FaSlidersH /> Course View Style
                  </label>
                  <select>
                    <option>Grid</option>
                    <option>List</option>
                  </select>
                </div>
              </div>

              <div id="security" className="settings-section">
                <h2>
                  <FaShieldAlt /> Security
                </h2>
                <div className="setting-item">
                  <label>
                    <FaKey /> Two-Factor Authentication
                  </label>
                  <button>Setup</button>
                </div>
                <div className="setting-item">
                  <label>
                    <FaLock /> Change Password
                  </label>
                  <button>Change</button>
                </div>
                <div className="setting-item">
                  <label>
                    <FaShieldAlt /> Device Login History
                  </label>
                  <button>View</button>
                </div>
                <div className="setting-item">
                  <label>
                    <FaShieldAlt /> Logout From All Devices
                  </label>
                  <button className="logout">Logout</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;

{
  /* <div className="edutrackr-main-body">
              <p className="edutrackr-main-description">
                Customize your EduTrackr experience by adjusting settings below.
              </p>
              <div className="edutrackr-settings-form">
                <div className="edutrackr-form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="edutrackr-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
            </div>
          </div> */
}
