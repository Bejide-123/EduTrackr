import { useEffect, useState } from "react";
import Navbar from "../Componenets/Navbar2";
import '../css/course.css';
import { FaUser, FaBook, FaClock, FaBookOpen } from "react-icons/fa";
import { MdDescription } from "react-icons/md"
import { BsBookmarkCheckFill } from "react-icons/bs"
import { FaIdBadge, FaChartBar, FaListOl, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Assignment from "../Componenets/Assignment";
import Toast from "../Componenets/Toast";

const Course = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userEmail = loginInfo?.email;
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const isMobile = window.innerWidth < 768;

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const getProgress = (courseCode, topics = []) => {
    if (!topics.length) return 0;
    const completed = JSON.parse(localStorage.getItem(`completedTopics_${courseCode}`)) || [];
    const progress = (completed.length / topics.length) * 100;
    return Math.round(progress);
  };

  useEffect(() => {
    if (userEmail) {
      const stored = localStorage.getItem(`courses_${userEmail}`);
      if (stored) {
        let loadedCourses = JSON.parse(stored);
        // Always recalculate and overwrite progress for all courses
        loadedCourses = loadedCourses.map(course => {
          const progress = getProgress(course.code, course.topics);
          return { ...course, progress };
        });
        // Overwrite localStorage with recalculated progress
        localStorage.setItem(`courses_${userEmail}`, JSON.stringify(loadedCourses));
        setCourses(loadedCourses);
      }
    }
  }, [userEmail]);

  const openDetails = (course) => {
    setSelectedCourse(course);
    const completed = JSON.parse(localStorage.getItem(`completedTopics_${course.code}`)) || [];
    setCompletedTopics(completed);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
    setCompletedTopics([]);
  };

  const toggleTopic = (index) => {
    let updated;
    if (completedTopics.includes(index)) {
      updated = completedTopics.filter(i => i !== index);
    } else {
      updated = [...completedTopics, index];
    }
    setCompletedTopics(updated);
    if (selectedCourse?.code) {
      localStorage.setItem(`completedTopics_${selectedCourse.code}`, JSON.stringify(updated));
      const userCoursesKey = `courses_${userEmail}`;
      const allCourses = JSON.parse(localStorage.getItem(userCoursesKey)) || [];
      const newProgress = Math.round((updated.length / (selectedCourse.topics?.length || 1)) * 100);
      const updatedCourses = allCourses.map(c =>
        c.code === selectedCourse.code ? { ...c, progress: newProgress } : c
      );
      localStorage.setItem(userCoursesKey, JSON.stringify(updatedCourses));
      setCourses(updatedCourses);
    }
  };

  return (
    <>
      <Navbar />
      <div className="wholepage">
        <div className="lefty">
          <div className="courses-page">
            {courses.length === 0 ? (
              <p className="no-courses">No courses found.</p>
            ) : (
              courses.map((course, index) => (
                <div className="courses-card" key={index}>
                  <div className="courses-header">
                    <h3><FaBook size={28} color='#1e40af' /> {course.name}</h3>
                  </div>
                  <p className="lecturer"><FaUser size={16} style={{ marginRight: '6px' }} /> By Instructor: {course.instructor}</p>
                  <p className="description"><MdDescription size={18} /> {course.description}</p>
                  <span className="duration"><FaClock size={16} color='#1e40af' style={{ marginLeft: '2px' }} /> {course.durationWeeks} Weeks</span>
                  <p className="last-stopped"><BsBookmarkCheckFill size={20} color='green' style={{ marginRight: '6px' }} />Completed !</p>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p id="measure">{course.progress}% completed</p>
                  <div className="btns">
                    <button id="resume-btn" className="resume-btn" onClick={() => navigate(`/resume-course/${course.id}`)}>Resume Course</button>
                    {/* <button className="resume-btn" onClick={() => openDetails(course)}>View Details</button> */}
                  </div>
                </div>
              ))
            )}
          </div>

          {showPopup && selectedCourse && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button className="close-popup" onClick={closePopup}>✖</button>
                <h2 className="popup-title">
                  <FaBook size={24} color="#1e40af" style={{ marginRight: "8px" }} />
                  {selectedCourse.name}
                </h2>

                <div className="popup-info">
                  <p><FaUser style={{ marginRight: '8px' }} /> <strong>Instructor:</strong> {selectedCourse.instructor}</p>
                  <p><FaIdBadge style={{ marginRight: '8px' }} /> <strong>Course Code:</strong> {selectedCourse.code}</p>
                  <p><FaClock style={{ marginRight: '8px' }} /> <strong>Duration:</strong> {selectedCourse.durationWeeks} weeks</p>
                  <p><FaInfoCircle style={{ marginRight: '8px' }} /> <strong>Description:</strong> {selectedCourse.description}</p>
                </div>

                <div className="progress-section">
                  <p><FaChartBar style={{ marginRight: '8px' }} /> <strong>Progress:</strong></p>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${getProgress(selectedCourse.code, selectedCourse.topics)}%` }}></div>
                  </div>
                  <p className="progress-text">{getProgress(selectedCourse.code, selectedCourse.topics)}% completed</p>
                </div>

                <h4 className="section-title">
                  <FaListOl color="#1e40af" style={{ marginRight: '8px' }} /> Topics
                </h4>
                {selectedCourse.topics?.length > 0 ? (
                  <ul className="topics-list">
                    {selectedCourse.topics.map((topic, index) => (
                      <li key={index}>
                        <label>
                          <input
                            type="checkbox"
                            checked={completedTopics.includes(index)}
                            onChange={() => toggleTopic(index)}
                          />
                          Week {index + 1}: {topic}
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No topics available.</p>
                )}

                <h4 className="section-title">
                  <FaBookOpen color="#1e40af" style={{ marginRight: '8px' }} /> Textbook
                </h4>
                <p>{selectedCourse.textbook || "No textbook listed."}</p>

                <button onClick={closePopup} className="cancel-popup-btn">Close</button>
              </div>
            </div>
          )}
        </div>
          
        {/* {!isMobile && (
          <div className="righty">
            <Assignment showToast={showToast} />
            {toast.show && (
              <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
            )}
          </div>
        )} */}
      </div>
    </>
  );
};

export default Course;
