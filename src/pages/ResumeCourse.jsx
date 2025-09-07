// ... your imports
import "../css/Resume.css";
import Navbar from "../Componenets/Navbar2";
import {
  FaBookOpen,
  FaCheckCircle,
  FaArrowCircleRight,
  FaLock,
  FaList,
  FaTimes,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Player } from "@lottiefiles/react-lottie-player";
import celebrateAnimation from "../assets/Fireworks.json";
import { PageLoader, SectionLoader } from "../Componenets/Loaders";
import Certificate from "../Componenets/Certificate";

const Resume = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [sectionLoading, setSectionLoading] = useState(true);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // New mobile states
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const userEmail = loginInfo?.email;
    if (!userEmail || !id) return;

    const courses =
      JSON.parse(localStorage.getItem(`courses_${userEmail}`)) || [];
    const selected = courses.find((c) => c.id === id);
    setCourse(selected);

    const completed =
      JSON.parse(localStorage.getItem(`completedTopics_${selected?.code}`)) ||
      [];
    setCompletedTopics(completed);

    const topics = selected?.topics || [];
    const firstUncompleted = topics.find((t) => !completed.includes(t.id));
    setSelectedTopic(firstUncompleted || topics[0]);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      setSectionLoading(true);
      const timer = setTimeout(() => setSectionLoading(false), 2000); // 1.5s loader
      return () => clearTimeout(timer);
    }
  }, [selectedTopic]);

  // New useEffect for handling window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      if (window.innerWidth > 640) {
        setShowMobileDrawer(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (initialLoading) return <PageLoader />;
  if (!course)
    return (
      <div className="resume-page">
        <h2>Course not found.</h2>
      </div>
    );

  const topics = course.topics || [];
  const isCompleted = (topicId) => completedTopics.includes(topicId);
  const progress = Math.round((completedTopics.length / topics.length) * 100);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  // New mobile-specific handlers
  const handleMobileTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowMobileDrawer(false);
  };

  const toggleMobileDrawer = () => {
    setShowMobileDrawer(!showMobileDrawer);
  };

  const closeMobileDrawer = () => {
    setShowMobileDrawer(false);
  };

  const handleMarkAsCompleted = () => {
    if (!selectedTopic || isCompleted(selectedTopic.id)) return;

    const updated = [...completedTopics, selectedTopic.id];
    setCompletedTopics(updated);
    localStorage.setItem(
      `completedTopics_${course.code}`,
      JSON.stringify(updated)
    );

    const next = topics.find((t) => !updated.includes(t.id));
    setSelectedTopic(next || null);

    if (!next) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 10000);
    }
  };

  const handleViewCertificate = () => {
    setSelectedTopic({ id: "certificate", title: "Certificate" });
  };

  return (
    <>
      <Navbar />
      <div className="resume-page">
        <div className="resume-page-container">
          {/* Desktop Sidebar */}
          <aside>
            <div className="course-details">
              <div className="course-name">
                <h2>{course.name}</h2>
              </div>
              <p>{progress}% completed</p>
              <div className="course-progress-bar">
                <div
                  className="course-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="topic-to-resume">
                <div className="cp">
                  <FaBookOpen />
                </div>
                <div className="topic-name">
                  <p>
                    Resume from:{" "}
                    {selectedTopic?.title || "All topics completed"}
                  </p>
                </div>
              </div>

              <div className="topic-list">
                {topics.map((topic) => {
                  const completed = isCompleted(topic.id);
                  const current = selectedTopic?.id === topic.id;
                  let icon;
                  let className = "course-topics";

                  if (completed) {
                    icon = <FaCheckCircle color="green" />;
                    className += " completed";
                  } else if (current) {
                    icon = <FaArrowCircleRight color="orange" />;
                    className += " current";
                  } else {
                    icon = <FaLock color="gray" />;
                    className += " locked";
                  }

                  return (
                    <div
                      className={className}
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="topic-icon">{icon}</span>
                      <span className="topic-title">{topic.title}</span>
                    </div>
                  );
                })}

                {progress === 100 && (
                  <div
                    className="course-topics certificate-entry"
                    onClick={handleViewCertificate}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="topic-icon">
                      <FaCheckCircle color="gold" />
                    </span>
                    <span className="topic-title">🎓 View Certificate</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="main-content">
            {/* Mobile Progress Header */}
            {isMobile && (
              <div className="mobile-progress-header">
                <h3>{course.name}</h3>
                <p className="mobile-progress-text">{progress}% completed</p>
                <div className="mobile-progress-bar">
                  <div
                    className="mobile-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Mobile Current Topic Display */}
            {isMobile &&
              selectedTopic &&
              selectedTopic.id !== "certificate" && (
                <div className="current-topic-display">
                  <div className="current-topic-title">
                    <FaBookOpen />
                    Current: {selectedTopic.title}
                  </div>
                  <p className="current-topic-progress">
                    Topic{" "}
                    {topics.findIndex((t) => t.id === selectedTopic.id) + 1} of{" "}
                    {topics.length}
                  </p>
                </div>
              )}

            {/* Main Content */}
            {selectedTopic ? (
              sectionLoading ? (
                <PageLoader />
              ) : selectedTopic.id === "certificate" ? (
                <Certificate courseName={course.name} />
              ) : (
                <>
                  <h3>{selectedTopic.title}</h3>
                  {selectedTopic.notes && (
                    <p className="topic-notes">
                      <strong>Notes:</strong> {selectedTopic.notes}
                    </p>
                  )}
                  {selectedTopic.fileData && (
                    <div className="pdf-container">
                      <iframe
                        src={selectedTopic.fileData}
                        title="Topic Material"
                      ></iframe>
                    </div>
                  )}
                  <button
                    className="mark-completed-btn"
                    onClick={handleMarkAsCompleted}
                    disabled={isCompleted(selectedTopic.id)}
                  >
                    {isCompleted(selectedTopic.id)
                      ? "✅ Completed"
                      : "Mark as Completed"}
                  </button>
                </>
              )
            ) : (
              <div className="all-done-message">
                {showCelebration && (
                  <div className="celebration-lottie">
                    <Player
                      autoplay
                      loop={false}
                      src={celebrateAnimation}
                      style={{ height: "250px", width: "250px" }}
                    />
                  </div>
                )}
                <h2>🎉 Congratulations!</h2>
                <p>You've completed all topics in this course!</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Topics Toggle Button */}
        {isMobile && (
          <button className="mobile-topics-toggle" onClick={toggleMobileDrawer}>
            <FaList />
          </button>
        )}

        {/* Mobile Overlay */}
        {isMobile && showMobileDrawer && (
          <div
            className="mobile-overlay show"
            onClick={closeMobileDrawer}
          ></div>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <div className={`mobile-drawer ${showMobileDrawer ? "open" : ""}`}>
            <div className="mobile-drawer-header">
              <h4 className="mobile-drawer-title">Course Topics</h4>
            </div>
            <div className="mobile-drawer-content">
              <div className="topic-list">
                {topics.map((topic) => {
                  const completed = isCompleted(topic.id);
                  const current = selectedTopic?.id === topic.id;
                  let icon;
                  let className = "course-topics";

                  if (completed) {
                    icon = <FaCheckCircle color="green" />;
                    className += " completed";
                  } else if (current) {
                    icon = <FaArrowCircleRight color="orange" />;
                    className += " current";
                  } else {
                    icon = <FaLock color="gray" />;
                    className += " locked";
                  }

                  return (
                    <div
                      className={className}
                      key={topic.id}
                      onClick={() => handleMobileTopicClick(topic)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="topic-icon">{icon}</span>
                      <span className="topic-title">{topic.title}</span>
                    </div>
                  );
                })}

                {progress === 100 && (
                  <div
                    className="course-topics certificate-entry"
                    onClick={() => {
                      handleViewCertificate();
                      setShowMobileDrawer(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="topic-icon">
                      <FaCheckCircle color="gold" />
                    </span>
                    <span className="topic-title">🎓 View Certificate</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
