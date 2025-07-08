import Navbar from "../Componenets/Navbar2";
import Sidebar from "../Componenets/Sidebar";
import { useState } from "react";
import '../css/Progress.css'; 
import { FaBook } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
import {
      BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import '../css/StudyChart.css';
import { FaTrophy, FaMedal, FaCertificate } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaFire } from 'react-icons/fa';
import { FaAward } from 'react-icons/fa'; 
import { FaCalendarCheck } from 'react-icons/fa';

const Progress = () => {
      const [activeTab, setActiveTab] = useState('course');

      // Load courses from localStorage for the current user
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const courses = currentUser && currentUser.email
        ? JSON.parse(localStorage.getItem(`courses_${currentUser.email}`)) || []
        : [];

      // Example: Weekly study data could be calculated from course progress or assignments if available
      // For now, keep the static data for the chart
      const data = [
        { day: 'MON', hours: 7 },
        { day: 'TUE', hours: 9 },
        { day: 'WED', hours: 2 },
        { day: 'THU', hours: 4 },
        { day: 'FRI', hours: 6 },
        { day: 'SAT', hours: 3 },
        { day: 'SUN', hours: 3 },
      ];
      return (
            <>
                  <Navbar />
                  <div style={{ display: 'flex' }} className="side">
                        <Sidebar activeTab={activeTab} onTabClick={setActiveTab} />
                        <main style={{ marginLeft: '230px', padding: '1rem' }}>
                        </main>
                  </div>
                  <div className="sections">
                        <div className="section1">
                              <section className="course-progress">
                                    <div className="cp">
                                          <h2> <FaChartLine color='#1e40af' style={{marginLeft: '10px'}}/> Course Progress</h2>
                                          <div className="cp-chart">
                                            {courses.length === 0 ? (
                                              <div style={{ color: '#888', padding: '1rem' }}>No courses found.</div>
                                            ) : (
                                              courses.map((course, idx) => {
                                                // Ensure progress is a number between 0 and 100
                                                let progress = 0;
                                                if (typeof course.progress === 'number') {
                                                  progress = Math.max(0, Math.min(100, course.progress));
                                                } else if (typeof course.progress === 'string' && course.progress.trim() !== '') {
                                                  const parsed = parseInt(course.progress, 10);
                                                  progress = isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed));
                                                }
                                                return (
                                                  <div className="cp-chart-item" key={course.id || idx}>
                                                    <div className="cp-chart-item-label">
                                                      <h3><FaBook color="#1e40af" style={{ marginRight: '8px' }} /> {course.title || course.name}</h3>
                                                    </div>
                                                    <div className="bottom">
                                                      <FaStar color="#f59e0b" size={28} style={{ marginRight: '10px', backgroundColor: '#f9f9f9' }} />
                                                      <div className="course-progress-bar">
                                                        <div className="course-progress-fill" style={{ width: `${progress}%` }}></div>
                                                      </div>
                                                      <div className="cp-chart-item-percentage">{progress}%</div>
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            )}
                                          </div>
                                    </div>
                              </section>
                              <section className="weekly-study-time">
                                    <div className="wst">
                                          <h2> <HiOutlineChartBar color="#f9f9f9" style={{fill: '#1e40af', marginRight: "10px"}}/>Weekly Study Time</h2>
                                          <div className="wst-chart">
                                                <div className="study-chart-container">
                                                      <ResponsiveContainer width="100%" height={280}>
                                                      <BarChart data={data}>
                                                      <XAxis dataKey="day" />
                                                      <YAxis hide />
                                                            <Tooltip formatter={(value) => `${value} hrs`} />
                                                      <Bar dataKey="hours" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                                                      </BarChart>
                                                      </ResponsiveContainer>
                                                </div>
                                          </div>
                                    </div>
                              </section>
                        </div>
                        <div className="section2">
                              <section className="achievements">
                                    <div className="achievements-card">
                                          <h3 className="achievements-title">
                                                <FaTrophy color="#f59e0b" style={{ marginRight: '8px' }} />
                                                      Achievements
                                          </h3>

                                          <div className="achievements-list">
                                                <div className="achievement-item">
                                                      <FaMedal color="#4ade80" size={38} style={{ marginRight: '8px' }} />
                                                      <span>Completed Linear Algebra Course</span>
                                                </div>
                                                <div className="achievement-item">
                                                      <FaCertificate color="#f87171" size={38} style={{ marginRight: '8px' }} />
                                                      <span>Earned Certificate in Mathematical Methods</span>
                                                </div>
                                                <div className="achievement-item">
                                                      <FaMedal color="#4ade80" size={38} style={{ marginRight: '8px' }} />
                                                      <span>Achieved 100% in Final Project</span>
                                                </div>
                                          </div>
                                    </div>
                              </section>
                              <section className="milestones">
                                     <div className="milestones-card">
                                                <h3 className="milestones-title">
                                                <FaFire color="#f97316" style={{ marginRight: '8px' }} />
                                                 Milestones
                                                </h3>

                                                <div className="milestone-list">
                                                      <div className="milestone-item">
                                                      <FaFire color="#f97316" size={38} className="milestone-icon" />
                                                      <div>
                                                      <h4 className="milestone-name">7-Day Streak</h4>
                                                      <p className="milestone-desc">You studied for 7 days in a row!</p>
                                                </div>
                                                </div>

                                                <div className="milestone-item">
                                                      <FaAward color="#10b981" size={38} className="milestone-icon" />
                                                      <div>
                                                      <h4 className="milestone-name">Consistent Learner</h4>
                                                      <p className="milestone-desc">Logged study hours every week for a month</p>
                                                </div>
                                                </div>

                                                <div className="milestone-item">
                                                      <FaCalendarCheck color="#3b82f6" size={38} className="milestone-icon" />
                                                      <div>
                                                      <h4 className="milestone-name">30-Day Challenge</h4>
                                                      <p className="milestone-desc">Completed a full month of study!</p>
                                                </div>
                                                </div>
                                          </div>
                                    </div>
                              </section>
                        </div>
                  </div>
            </>
      )
}

export default Progress