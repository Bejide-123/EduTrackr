import Navbar from "../Componenets/Navbar2";
import { FaPlus } from "react-icons/fa";
import "../css/Schedule.css";
import { useState, useEffect } from "react";
import Toast from "../Componenets/Toast";

const Schedule = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userEmail = loginInfo?.email;

  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [countdown, setCountdown] = useState("");
  const [currentTarget, setCurrentTarget] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const [form, setForm] = useState({
    day: "",
    time: "",
    course: "",
    duration: "",
    priority: "",
    repeat: "",
    reminder: "",
  });

  // Load user courses & saved schedules on mount
  useEffect(() => {
    if (userEmail) {
      const storedCourses = localStorage.getItem(`courses_${userEmail}`);
      const storedSchedules = localStorage.getItem(`schedules_${userEmail}`);
      if (storedCourses) setCourses(JSON.parse(storedCourses));
      if (storedSchedules) setSchedules(JSON.parse(storedSchedules));
    }
  }, [userEmail]);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toLocaleString(undefined, { weekday: "long" });
      const now = new Date();

      const todaySchedules = schedules
        .filter((s) => s.day === today)
        .sort((a, b) => a.time.localeCompare(b.time));

      for (let sched of todaySchedules) {
        const [hours, minutes] = sched.time.split(":").map(Number);
        const schedTime = new Date();
        schedTime.setHours(hours, minutes, 0, 0);

        if (schedTime > now) {
          setCurrentTarget(sched);

          const diff = schedTime - now;
          const totalSeconds = Math.floor(diff / 1000);
          const hrs = Math.floor(totalSeconds / 3600);
          const mins = Math.floor((totalSeconds % 3600) / 60);
          const secs = totalSeconds % 60;

          const hrsStr = hrs.toString().padStart(2, "0");
          const minsStr = mins.toString().padStart(2, "0");
          const secsStr = secs.toString().padStart(2, "0");

          setCountdown(`${hrsStr}hr:${minsStr}min:${secsStr}sec`);
          return;
        }
      }

      // If all today's schedules are done
      setCurrentTarget(null);
      setCountdown("No upcoming schedule");
    }, 1000);

    return () => clearInterval(interval);
  }, [schedules]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      day: "",
      time: "",
      course: "",
      duration: "",
      priority: "",
      repeat: "",
      reminder: "",
    });
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    if (!showForm) resetForm();
  };

  const closePopup = () => {
    setShowForm(false);
    resetForm();
  };

  const Done = () => {
    const newSchedule = { ...form };
    const updatedSchedules = [...schedules, newSchedule];

    // Save to state and localStorage
    setSchedules(updatedSchedules);
    localStorage.setItem(
      `schedules_${userEmail}`,
      JSON.stringify(updatedSchedules)
    );

    showToast("Schedule added successfully", "success");
    resetForm();
    setShowForm(false);
  };

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    const day = schedule.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(schedule);
    return acc;
  }, {});

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
  };

  function getEndTime(startTime, duration) {
    if (!startTime || !duration) return "";

    const [startHours, startMinutes] = startTime.split(":").map(Number);

    // Normalize the string
    const normalized = duration
      .toLowerCase()
      .replace(/[^0-9a-z]/g, " ")
      .replace(/\s+/g, " ");

    // Extract hours and minutes
    let hours = 0;
    let minutes = 0;

    const hourMatch = normalized.match(/(\d+)\s*h/);
    const minuteMatch = normalized.match(/(\d+)\s*m/);

    if (hourMatch) hours = parseInt(hourMatch[1]);
    if (minuteMatch) minutes = parseInt(minuteMatch[1]);

    // Add to start time
    let endHours = startHours + hours;
    let endMinutes = startMinutes + minutes;

    if (endMinutes >= 60) {
      endHours += Math.floor(endMinutes / 60);
      endMinutes %= 60;
    }

    endHours %= 24; // wrap around for next day

    // Format
    const formattedHours = endHours.toString().padStart(2, "0");
    const formattedMinutes = endMinutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }
  const courseColors = [
    "#1e3a8a", // Bold Blue
    "#b91c1c", // Bold Red
    "#059669", // Emerald Green
    "#7c3aed", // Deep Purple
    "#d97706", // Amber
    "#0f766e", // Teal
    "#dc2626", // Crimson
    "#4f46e5", // Indigo
    "#be123c", // Rose
    "#065f46", // Dark Green
  ];

  const courseColorMap = {};
  let colorIndex = 0;

  courses.forEach((course) => {
    if (!courseColorMap[course.name]) {
      courseColorMap[course.name] =
        courseColors[colorIndex % courseColors.length];
      colorIndex++;
    }
  });

  return (
    <>
      <Navbar />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}

      <div className="schedule-container">
        <div className="top-section">
          <div className="today-schedule">
            <div className="section-header">
              <h3>Today's Schedule</h3>
              <button className="view-btn">View</button>
            </div>
            {(() => {
              const today = new Date().toLocaleDateString("en-US", {
                weekday: "long",
              });
              const todaysSchedules = schedules.filter((s) => s.day === today);

              return todaysSchedules.length === 0 ? (
                <p>No schedule added for today.</p>
              ) : (
                <ul>
                  {todaysSchedules.slice(0, 3).map((item, index) => (
                    <div id="idli" key={index}>
                      <div className="thi">
                        <div className="ty">
                          <h3>{item.course}</h3>
                          <p>
                            {item.time} - {getEndTime(item.time, item.duration)}
                          </p>
                        </div>
                        <div className="ty">
                          <button onClick={() => handleScheduleClick(item)}>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              );
            })()}
          </div>

          <div className="timer">
            <div className="section-header">
              <h3>Upcomming Events</h3>
            </div>
            <div className="countdown-timer">
              <p>{countdown}</p>
              {currentTarget && (
                <p className="next-course">
                  Next: <strong>{currentTarget.course}</strong> at{" "}
                  {currentTarget.time}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <div className="section-header">
            <h2>Weekly Overview</h2>
            <button className="add-btn" onClick={toggleForm}>
              <FaPlus /> Add Schedule
            </button>

            {showForm && (
              <>
                <div className="form-overlay"></div>
                <form
                  className="course-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Done();
                  }}
                >
                  <div className="part">
                    <div className="form-group">
                      <label htmlFor="day">Day</label>
                      <select
                        required
                        id="day"
                        name="day"
                        value={form.day}
                        onChange={handleChange}
                      >
                        <option value="">Select a day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">Time</label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="course">Course</label>
                    <select
                      required
                      name="course"
                      id="course"
                      value={form.course}
                      onChange={handleChange}
                    >
                      <option value="">Select Course</option>
                      {courses.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Duration (e.g., 1hr 30min)</label>
                    <input
                      type="text"
                      name="duration"
                      id="duration"
                      value={form.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="part" id="fish">
                    <div className="form-group">
                      <label htmlFor="priority">Priority Level</label>
                      <select
                        name="priority"
                        id="priority"
                        value={form.priority}
                        onChange={handleChange}
                      >
                        <option value="">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="repeat">Repeat</label>
                      <select
                        name="repeat"
                        id="repeat"
                        value={form.repeat}
                        onChange={handleChange}
                      >
                        <option value="">Do not repeat</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="reminder">Reminder Time</label>
                    <select
                      name="reminder"
                      id="reminder"
                      value={form.reminder}
                      onChange={handleChange}
                    >
                      <option value="">Select reminder time</option>
                      <option value="5">5 minutes before</option>
                      <option value="10">10 minutes before</option>
                      <option value="30">30 minutes before</option>
                      <option value="60">1 hour before</option>
                    </select>
                  </div>

                  <div className="btnns">
                    <button onClick={closePopup} className="cancel">
                      Cancel
                    </button>
                    <button type="submit">Add</button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="weekly-table-responsive">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className="day-block">
                <div className="day-title">{day}</div>
                <div className="day-schedule-items">
                  {groupedSchedules[day]?.length > 0 ? (
                    groupedSchedules[day].map((schedule, idx) => (
                      <button
                        key={idx}
                        className="schedule-btn"
                        style={{
                          backgroundColor: courseColorMap[schedule.course],
                        }}
                        onClick={() => handleScheduleClick(schedule)}
                      >
                        {schedule.course}
                      </button>
                    ))
                  ) : (
                    <p className="no-schedule">No schedules</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedSchedule && (
            <>
              <div
                className="form-overlay"
                onClick={() => setSelectedSchedule(null)}
              ></div>
              <div className="schedule-details-modal">
                <h3>{selectedSchedule.course}</h3>
                <p>
                  <strong>Day:</strong> {selectedSchedule.day}
                </p>
                <p>
                  <strong>Time:</strong> {selectedSchedule.time}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedSchedule.duration}
                </p>
                <p>
                  <strong>Priority:</strong> {selectedSchedule.priority}
                </p>
                <p>
                  <strong>Repeat:</strong> {selectedSchedule.repeat}
                </p>
                <p>
                  <strong>Reminder:</strong> {selectedSchedule.reminder} mins
                  before
                </p>
                <button
                  className="close-btn"
                  onClick={() => setSelectedSchedule(null)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule;
