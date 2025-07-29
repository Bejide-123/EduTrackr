import Navbar from "../Componenets/Navbar";
import studyImage from "../assets/images (1).jpeg";
import '../css/Home.css'; 
import { FaRegCalendarCheck, FaChartBar, FaFolderOpen, FaUserLock } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUsers, FaCheckCircle, FaClock, FaSmile } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { PageLoader, ButtonLoader, SectionLoader } from "../Componenets/Loaders";


const Home = () => {
      const [loading, setLoading] = useState(true);
      useEffect(() => {
            const timer = setTimeout(() => {
                  setLoading(false);
            }, 7000); 
            return () => clearTimeout(timer);
      }, []);
      if (loading) {
            return <PageLoader />;
      }
  return (
    <div>
      <Navbar />
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to EduTrackr</h1>
          <p className="hero-description">
            EduTrackr helps you stay focused, organized, and in control of your learning.
            With features like goal setting, progress tracking, and personalized study plans,
            you’ll have everything you need to reach your academic goals faster and smarter.
         </p>

          <Link to="/login" className="cta-button">Explore Features</Link>
        </div>
        <div className="hero-image">
          <img src={studyImage} alt="Study progress" />
        </div>
      </header>

      <section id="features" className="features">
            <h2 id="lit">Features</h2>
            <div className="cards">
                  <div className="card">
                        <FaRegCalendarCheck size={32} color="#1e40af" />
                        <h2>Smart Study Planning</h2><br />
                        <p>Allows users to create and schedule study tasks, assign subjects, set deadlines, and estimate time required. Helps break big goals into small, trackable study sessions, so they don’t feel overwhelmed.</p>
                  </div>
                  <div className="card">
                        <FaChartBar size={32} color="#1e40af" />
                        <h2>Progress Tracker</h2><br />
                        <p>Visualizes how much the user has accomplished. Tracks completed vs pending tasks using progress bars, percentages, or charts. Encourages consistency and builds motivation through visible achievements.</p>
                  </div>
                  <div className="card">
                        <MdDashboardCustomize size={32} color="#1e40af" />
                        <h2>Personalized Dashboard</h2><br />
                        <p>A custom home for each user after login. It shows today’s tasks, weekly goals, and motivational quotes or tips to keep them focused. The dashboard adjusts based on user data and habits.</p>
                  </div>
                  <div className="card">
                        <IoMdNotificationsOutline size={32} color="#1e40af" />
                        <h2>In-App Reminders & Notifications</h2><br />
                        <p>Sends subtle alerts (like toast pop-ups or modal prompts) to remind users when a task is due soon or when it’s time to study. Helps avoid procrastination and supports time management — no need to leave the app.</p>
                  </div>
                  <div className="card">
                        <FaFolderOpen size={32} color="#1e40af" />
                        <h2>Subject-Based Organization</h2><br />
                        <p>Lets users group their tasks by subjects or topics (e.g. JavaScript, Calculus, Literature). Makes it easier to manage workload across multiple subjects and stay balanced in study routines.</p>
                  </div>
                  <div className="card">
                        <FaUserLock size={32} color="#1e40af" />
                        <h2>User Authentication</h2><br />
                        <p>Secures access to personal data. Each user can register, log in, and see their own personalized study schedule, progress, and preferences. Ensures privacy and a customized experience.</p>
                  </div>
            </div>
      </section>
      <section className="impact">
            <h1>Our Impact in Numbers</h1>
            <p>Join thousands of satisfied learners who have transformed their lives with EduTrackr</p>
            <div className="impact-container">
                  <div className="impact-item">
                        <FaUsers size={48} color="#1e40af" />
                        <h2>10,000+</h2>
                        <p>Active Users</p>
                  </div>
                  <div className="impact-item">
                        <FaCheckCircle size={48} color="#22c55e" />
                        <h2>95%</h2>
                        <p>User Satisfaction</p>
                  </div>
                  <div className="impact-item">
                        <FaClock size={48} color="#fbbf24" />
                        <h2>20%</h2>
                        <p>Time Saved</p>
                  </div>
                  <div className="impact-item">
                        <FaSmile size={48} color="#facc15" />
                        <h2>4.8/5</h2>
                        <p>Average Rating</p>
                  </div>
            </div>
      </section>
      <section className="reviews">
            <h2>What Our Users Say</h2>
<div className="review-container">
  <div className="review-item">
    <img
      src="https://randomuser.me/api/portraits/women/44.jpg"
      alt="Sarah J."
      className="review-avatar"
    />
    <p>"EduTrackr has completely transformed my study habits. I feel more organized and focused than ever!"</p>
    <div className="review-stars">
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
  </div>
    <h3>- Sarah J.</h3>
  </div>
  <div className="review-item">
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Mark T."
      className="review-avatar"
    />
    <p>"The personalized dashboard keeps me on track and motivated. I love the progress tracking feature!"</p>
    <div className="review-stars">
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
  </div>
    <h3>- Mark T.</h3>
  </div>
  <div className="review-item">
    <img
      src="https://randomuser.me/api/portraits/women/65.jpg"
      alt="Emily R."
      className="review-avatar"
    />
    <p>"I can’t imagine studying without EduTrackr now. It’s like having a personal study coach!"</p>
    <div className="review-stars">
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
    <FaStar color="#facc15" />
  </div>
    <h3>- Emily R.</h3>
  </div>
</div>
      </section>
      <section className="call-to-action">
            <h2>Join the EduTrackr Community</h2>
            <div className="contain">
                  <div className="right">
                        <h1>Ready to Take Control of Your Learning?</h1><br />
                        <p>Join EduTrackr today and start your journey towards academic success!</p><br />
                        <Link to="/login" className="cta-button">Get Started!</Link>
                  </div>
                  <div className="left">
                       <h2>Key Features</h2>
                        <ul>
                              <li><FaRegCalendarCheck /> Smart Study Planning</li>
                              <li><FaChartBar /> Progress Tracking</li>
                              <li><MdDashboardCustomize /> Personalized Dashboard</li>
                              <li><FaFolderOpen /> Subject-Based Organization</li>
                              <li><FaUserLock /> User Authentication</li>
                        </ul>
                  </div>
            </div>
      </section>
      <footer className="footer">
        <p>&copy; 2023 EduTrackr. All rights reserved.</p>
        <p>Follow us on <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
      </footer>
    </div>
  );
};

export default Home;
