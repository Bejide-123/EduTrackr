import { FaBookOpen, FaClipboardList, FaClock } from "react-icons/fa";
import "../css/dashboard.css";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [courseCount, setCourseCount] = useState(0);
  const [userFirstName, setUserFirstName] = useState("");

  const isToday = (dateObj) => {
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    const updateCount = () => {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      let savedCourses = [];
      if (loginInfo && loginInfo.email) {
        savedCourses =
          JSON.parse(localStorage.getItem(`courses_${loginInfo.email}`)) || [];
      }
      setCourseCount(savedCourses.length);
    };

    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo && loginInfo.name) {
      setUserFirstName(loginInfo.name.split(" ")[0]);
    }

    updateCount();

    window.addEventListener("coursesUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("coursesUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <div className="dashboard-page">
      <div className="left-widget">
        <h4>Quick Tip 💡</h4>
        <p>Break your study sessions into 25-minute focus blocks.</p>
      </div>

      <div className="dashboard-container">
        <div className="welcome">
          <h3>Welcome {userFirstName ? `${userFirstName}!` : "!"}</h3>
        </div>
        <div className="items">
          <div className="dashboard-item">
            <div className="dashboard-icon">
              <FaBookOpen />
            </div>
            <div>
              <p className="number">{courseCount}</p>
              <p className="text">Registered Courses</p>
            </div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-icon">
              <FaClipboardList />
            </div>
            <div>
              <p className="number">5</p>
              <p className="text">Assignments</p>
            </div>
          </div>
          <div className="dashboard-item">
            <div className="dashboard-icon">
              <FaClock />
            </div>
            <div>
              <p className="number">5</p>
              <p className="text">Learning Hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-widget">
        <h4>Calendar 📅</h4>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date: d, view }) =>
            view === "month"
              ? isToday(d)
                ? "calendar-tile-today"
                : "calendar-tile-default"
              : undefined
          }
          showNavigation={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
