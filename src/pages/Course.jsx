import { useEffect, useState } from "react";
import Navbar from "../Componenets/Navbar2";
import "../css/course.css";
import { FaUser, FaBook, FaClock, FaBookOpen } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import {
  FaIdBadge,
  FaChartBar,
  FaListOl,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Assignment from "../Componenets/Assignment";
import Toast from "../Componenets/Toast";
import { PageLoader } from "../Componenets/Loaders";

const Course = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userEmail = loginInfo?.email;
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userEmail) {
      try {
        const stored = localStorage.getItem(`courses_${userEmail}`);
        if (stored) {
          let loadedCourses = JSON.parse(stored);
          
          // Ensure loadedCourses is an array
          if (!Array.isArray(loadedCourses)) {
            loadedCourses = [];
          }
          
          // Process courses with progress calculation
          loadedCourses = loadedCourses.map((course) => {
            // Ensure course has required properties
            const safeCourse = {
              name: course?.name || "Untitled Course",
              instructor: course?.instructor || "Unknown Instructor",
              description: course?.description || "No description available",
              code: course?.code || "NO-CODE",
              topics: Array.isArray(course?.topics) ? course.topics : [],
              durationWeeks: course?.durationWeeks || 0,
              id: course?.id || Math.random().toString(36).substr(2, 9),
              textbook: course?.textbook || "No textbook listed",
              ...course
            };
            
            const progress = getProgress(safeCourse.code, safeCourse.topics);
            return { ...safeCourse, progress };
          });
          
          localStorage.setItem(
            `courses_${userEmail}`,
            JSON.stringify(loadedCourses)
          );
          setCourses(loadedCourses);
          setFilteredCourses(loadedCourses);
        } else {
          // No courses stored
          setCourses([]);
          setFilteredCourses([]);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        setCourses([]);
        setFilteredCourses([]);
        showToast("Error loading courses. Please try refreshing.", "error");
      }
    }
  }, [userEmail]);

  // Enhanced search functionality with better error handling
  useEffect(() => {
    if (!Array.isArray(courses)) {
      setFilteredCourses([]);
      return;
    }

    if (!searchTerm?.trim()) {
      setFilteredCourses(courses);
    } else {
      try {
        const searchLower = searchTerm.toLowerCase().trim();
        const filtered = courses.filter((course) => {
          if (!course) return false;
          
          // Safe string checking with fallbacks
          const name = (course.name || "").toLowerCase();
          const instructor = (course.instructor || "").toLowerCase();
          const description = (course.description || "").toLowerCase();
          const code = (course.code || "").toLowerCase();
          
          // Search in basic fields
          if (
            name.includes(searchLower) ||
            instructor.includes(searchLower) ||
            description.includes(searchLower) ||
            code.includes(searchLower)
          ) {
            return true;
          }
          
          // Search in topics array
          if (Array.isArray(course.topics)) {
            return course.topics.some(topic => 
              String(topic || "").toLowerCase().includes(searchLower)
            );
          }
          
          return false;
        });
        
        setFilteredCourses(filtered);
      } catch (error) {
        console.error("Error during search:", error);
        setFilteredCourses(courses); // Fallback to showing all courses
      }
    }
  }, [searchTerm, courses]);

  const handleSearchChange = (e) => {
    const value = e?.target?.value || "";
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleSearchIconClick = () => {
    try {
      const searchInput = document.querySelector('.search-bar');
      if (searchInput) {
        searchInput.focus();
      }
    } catch (error) {
      console.error("Error focusing search input:", error);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const getProgress = (courseCode, topics = []) => {
    try {
      if (!Array.isArray(topics) || topics.length === 0) return 0;
      
      const completed = JSON.parse(
        localStorage.getItem(`completedTopics_${courseCode}`) || "[]"
      );
      
      if (!Array.isArray(completed)) return 0;
      
      const progress = (completed.length / topics.length) * 100;
      return Math.round(Math.max(0, Math.min(100, progress))); // Clamp between 0-100
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  const openDetails = (course) => {
    if (!course) return;
    
    try {
      setSelectedCourse(course);
      const completed = JSON.parse(
        localStorage.getItem(`completedTopics_${course.code}`) || "[]"
      );
      setCompletedTopics(Array.isArray(completed) ? completed : []);
      setShowPopup(true);
    } catch (error) {
      console.error("Error opening course details:", error);
      showToast("Error opening course details", "error");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
    setCompletedTopics([]);
  };

  const toggleTopic = (index) => {
    if (!selectedCourse?.code || typeof index !== 'number') return;
    
    try {
      let updated;
      if (completedTopics.includes(index)) {
        updated = completedTopics.filter((i) => i !== index);
      } else {
        updated = [...completedTopics, index];
      }
      
      setCompletedTopics(updated);
      
      // Update localStorage
      localStorage.setItem(
        `completedTopics_${selectedCourse.code}`,
        JSON.stringify(updated)
      );
      
      // Update course progress
      const userCoursesKey = `courses_${userEmail}`;
      const allCourses = JSON.parse(localStorage.getItem(userCoursesKey) || "[]");
      
      if (Array.isArray(allCourses)) {
        const topicsLength = Array.isArray(selectedCourse.topics) 
          ? selectedCourse.topics.length 
          : 1;
        const newProgress = Math.round((updated.length / topicsLength) * 100);
        
        const updatedCourses = allCourses.map((c) =>
          c?.code === selectedCourse.code ? { ...c, progress: newProgress } : c
        );
        
        localStorage.setItem(userCoursesKey, JSON.stringify(updatedCourses));
        setCourses(updatedCourses);
      }
    } catch (error) {
      console.error("Error toggling topic:", error);
      showToast("Error updating topic progress", "error");
    }
  };

  const handleResumeClick = (courseId) => {
    if (!courseId) {
      showToast("Invalid course ID", "error");
      return;
    }
    
    try {
      navigate(`/resume-course/${courseId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      showToast("Error navigating to course", "error");
    }
  };

  if (initialLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <div className="search-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Search courses, instructors, topics..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch 
            size={20} 
            color="#1e40af" 
            className="search-icon"
            onClick={handleSearchIconClick}
          />
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={clearSearch}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="wholepage">
        <div className="lefty">
          <div className="courses-page">
            {!Array.isArray(filteredCourses) || filteredCourses.length === 0 ? (
              <div className="no-courses">
                {searchTerm ? (
                  <div className="no-search-results">
                    <FaSearch size={48} color="#9ca3af" />
                    <h3>No courses found</h3>
                    <p>No courses match "{searchTerm}"</p>
                    <button onClick={clearSearch} className="clear-search-link">
                      Show all courses
                    </button>
                  </div>
                ) : (
                  <div className="no-courses-available">
                    <FaBook size={48} color="#9ca3af" />
                    <h3>No courses available</h3>
                    <p>You haven't enrolled in any courses yet.</p>
                  </div>
                )}
              </div>
            ) : (
              filteredCourses.map((course, index) => {
                if (!course) return null;
                
                return (
                  <div className="courses-card" key={course.id || index}>
                    <div className="courses-header">
                      <h3>
                        <FaBook size={28} color="#1e40af" /> {course.name}
                      </h3>
                    </div>
                    <p className="lecturer">
                      <FaUser size={16} style={{ marginRight: "6px" }} /> 
                      By Instructor: {course.instructor}
                    </p>
                    <p className="description">
                      <MdDescription size={18} /> {course.description}
                    </p>
                    <span className="duration">
                      <FaClock
                        size={16}
                        color="#1e40af"
                        style={{ marginLeft: "2px" }}
                      />{" "}
                      {course.durationWeeks} Weeks
                    </span>
                    <p className="last-stopped">
                      <BsBookmarkCheckFill
                        size={20}
                        color="green"
                        style={{ marginRight: "6px" }}
                      />
                      {course.progress === 100 ? "Completed!" : "In Progress"}
                    </p>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p id="measure">{course.progress || 0}% completed</p>
                    <div className="btns">
                      <button
                        id="resume-btn"
                        className="resume-btn"
                        onClick={() => handleResumeClick(course.id)}
                      >
                        {course.progress === 100 ? "Review Course" : "Resume Course"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {showPopup && selectedCourse && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button className="close-popup" onClick={closePopup}>
                  ✖
                </button>
                <h2 className="popup-title">
                  <FaBook
                    size={24}
                    color="#1e40af"
                    style={{ marginRight: "8px" }}
                  />
                  {selectedCourse.name}
                </h2>

                <div className="popup-info">
                  <p>
                    <FaUser style={{ marginRight: "8px" }} />
                    <strong>Instructor:</strong> {selectedCourse.instructor}
                  </p>
                  <p>
                    <FaIdBadge style={{ marginRight: "8px" }} />
                    <strong>Course Code:</strong> {selectedCourse.code}
                  </p>
                  <p>
                    <FaClock style={{ marginRight: "8px" }} />
                    <strong>Duration:</strong> {selectedCourse.durationWeeks} weeks
                  </p>
                  <p>
                    <FaInfoCircle style={{ marginRight: "8px" }} />
                    <strong>Description:</strong> {selectedCourse.description}
                  </p>
                </div>

                <div className="progress-section">
                  <p>
                    <FaChartBar style={{ marginRight: "8px" }} />
                    <strong>Progress:</strong>
                  </p>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${getProgress(
                          selectedCourse.code,
                          selectedCourse.topics
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="progress-text">
                    {getProgress(selectedCourse.code, selectedCourse.topics)}%
                    completed
                  </p>
                </div>

                <h4 className="section-title">
                  <FaListOl color="#1e40af" style={{ marginRight: "8px" }} />
                  Topics
                </h4>
                {Array.isArray(selectedCourse.topics) && selectedCourse.topics.length > 0 ? (
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
                  <FaBookOpen color="#1e40af" style={{ marginRight: "8px" }} />
                  Textbook
                </h4>
                <p>{selectedCourse.textbook}</p>

                <button onClick={closePopup} className="cancel-popup-btn">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </div>
    </>
  );
};

export default Course;