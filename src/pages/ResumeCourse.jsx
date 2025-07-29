import "../css/Resume.css";
import Navbar from "../Componenets/Navbar2";
import {
  FaBookOpen,
  FaCheckCircle,
  FaArrowCircleRight,
  FaLock,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Player } from "@lottiefiles/react-lottie-player";
import celebrateAnimation from "../assets/Fireworks.json"; // Place your Lottie file here
import { PageLoader } from "../Componenets/Loaders";

const Resume = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

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
        const timer = setTimeout(() => {
          setInitialLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);
    
      if (initialLoading) {
        return <PageLoader />;
      }

  if (!course) {
    return (
      <div className="resume-page">
        <h2>Course not found.</h2>
      </div>
    );
  }

  const topics = course.topics || [];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  // const handleMarkAsCompleted = () => {
  //   if (!selectedTopic || completedTopics.includes(selectedTopic.id)) return;

  //   const updated = [...completedTopics, selectedTopic.id];
  //   setCompletedTopics(updated);
  //   localStorage.setItem(`completedTopics_${course.code}`, JSON.stringify(updated));

  //   // auto move to next topic if available
  //   const next = topics.find(t => !updated.includes(t.id));
  //   setSelectedTopic(next || null);
  // };

  const handleMarkAsCompleted = () => {
    if (!selectedTopic || completedTopics.includes(selectedTopic.id)) return;

    const updated = [...completedTopics, selectedTopic.id];
    setCompletedTopics(updated);
    localStorage.setItem(
      `completedTopics_${course.code}`,
      JSON.stringify(updated)
    );

    const next = topics.find((t) => !updated.includes(t.id));
    setSelectedTopic(next || null);

    // 🎉 Show celebration if all topics are now completed
    if (!next) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
      setShowCelebration(true);

      // Hide Lottie after 4 seconds
      setTimeout(() => setShowCelebration(false), 10000);
    }
  };

  const isCompleted = (topicId) => completedTopics.includes(topicId);
  const progress = Math.round((completedTopics.length / topics.length) * 100);

  return (
    <>
      <Navbar />
      <div className="resume-page">
        <div className="resume-page-container">
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
                    onClick={() => navigate(`/certificate`)} // Add link to certificate page with course id
                    
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
            {selectedTopic ? (
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
                      width="100%"
                      height="400px"
                    ></iframe>
                  </div>
                )}
                <button
                  className="mark-completed-btn"
                  onClick={handleMarkAsCompleted}
                  disabled={isCompleted(selectedTopic.id)}
                >
                  {isCompleted(selectedTopic.id)
                    ? "Already Completed"
                    : "Mark as Completed"}
                </button>
              </>
            ) : (
              // <p> completed</p>
              <div className="all-done-message">
                {/* <h2>🎉 Congratulations!</h2>
                <p>
                  You’ve completed the <strong>{course.name}</strong> course.
                </p> */}

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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
