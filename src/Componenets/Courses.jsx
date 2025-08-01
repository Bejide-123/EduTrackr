import React, { useEffect, useState } from 'react';
import '../css/Courses.css';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaUser, FaBook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Course = ({ showToast }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userEmail = loginInfo?.email;
  const navigate = useNavigate();

  const [durationWeeks, setDurationWeeks] = useState(0);
  const [weeklyTopics, setWeeklyTopics] = useState([]);
  const [courses, setCourses] = useState(() => {
    if (!userEmail) return [];
    return JSON.parse(localStorage.getItem(`courses_${userEmail}`)) || [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Bulk fix for old courses without IDs and topic IDs
  useEffect(() => {
    if (userEmail && courses.some(course => !course.id || course.topics?.some(topic => !topic.id))) {
      const fixed = courses.map(course => ({
        ...course,
        id: course.id || crypto.randomUUID(),
        topics: (course.topics || []).map(topic => ({
          ...topic,
          id: topic.id || crypto.randomUUID(),
        })),
      }));
      setCourses(fixed); // triggers localStorage update via next useEffect
    }
  }, [courses, userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`courses_${userEmail}`, JSON.stringify(courses));
      window.dispatchEvent(new Event("coursesUpdated"));
    }
  }, [courses, userEmail]);

  const toggleForm = () => {
    setShowForm(prev => !prev);
    setEditingIndex(null);
    setWeeklyTopics([]);
    setDurationWeeks(0);
  };

  const getNextLearningDay = (selectedDays) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const futureDays = selectedDays
      .map(day => weekdays.indexOf(day))
      .filter(index => index !== -1)
      .sort((a, b) => (a - today + 7) % 7 - (b - today + 7) % 7);

    const nextIndex = futureDays.length > 0 ? futureDays[0] : null;
    return nextIndex !== null ? weekdays[nextIndex] : 'Not scheduled';
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...weeklyTopics];
      updated[index] = {
        ...updated[index],
        fileName: file.name,
        fileData: reader.result,
      };
      setWeeklyTopics(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdateCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectedDays = Array.from(form.days.selectedOptions).map(opt => opt.value);
    const nextDay = getNextLearningDay(selectedDays);

    // ✅ Assign ID properly whether editing or not
    let existingCourseId = editingIndex !== null ? courses[editingIndex]?.id : null;
    if (!existingCourseId) {
      existingCourseId = crypto.randomUUID();
    }

    const newCourse = {
      id: existingCourseId,
      name: form.name.value,
      code: form.code.value,
      instructor: form.instructor.value,
      days: selectedDays,
      nextDay,
      description: form.description.value,
      textbook: form.textbook.value,
      assignment: form.assignment.value,
      durationWeeks,
      topics: weeklyTopics.map(topic => ({
        ...topic,
        id: topic.id || crypto.randomUUID()
      })),
    };

    const updatedCourses = [...courses];
    if (editingIndex !== null) {
      updatedCourses[editingIndex] = newCourse;
    } else {
      updatedCourses.unshift(newCourse);
    }

    setCourses(updatedCourses);
    form.reset();
    toggleForm();
    if (showToast) {
      showToast(editingIndex !== null ? "Course updated successfully" : "Course added successfully", "success");
    }
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setEditingIndex(index);
    setDurationWeeks(course.durationWeeks || 0);
    setWeeklyTopics(course.topics || []);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    if (showToast) {
      showToast("Course deleted successfully");
    }
  };

  if (!userEmail) {
    return <div className="dashboard"><h2>Please log in to view your courses.</h2></div>;
  }

  const getProgress = (course) => {
    const { code, topics = [] } = course || {};
    if (!topics.length) return 0;
    const completed = JSON.parse(localStorage.getItem(`completedTopics_${code}`)) || [];
    return Math.round((completed.length / topics.length) * 100);
  };

  return (
    <div className="dashboard">
      <div className="courses-header">
        <h2>Courses</h2>
        {!showForm && (
          <button className="add-course-icon" onClick={toggleForm} title="Add Course">
            <FaPlus size={20} />
          </button>
        )}
      </div>

      {showForm && (
        <>
          <div className="form-overlay" onClick={toggleForm}></div>
          <form className="course-form" onSubmit={handleAddOrUpdateCourse}>
            <input type="text" name="name" placeholder="Course Name" required defaultValue={editingIndex !== null ? courses[editingIndex].name : ''} />
            <input type="text" name="code" placeholder="Course Code" required defaultValue={editingIndex !== null ? courses[editingIndex].code : ''} />
            <input type="text" name="instructor" placeholder="Instructor Name" required defaultValue={editingIndex !== null ? courses[editingIndex].instructor : ''} />
            <input type="text" name="description" placeholder="Brief Description" defaultValue={editingIndex !== null ? courses[editingIndex].description : ''} />
            <input type="text" name="textbook" placeholder="Recommended Textbook" defaultValue={editingIndex !== null ? courses[editingIndex].textbook : ''} />
            <input type="text" name="assignment" placeholder="Assignments Info" defaultValue={editingIndex !== null ? courses[editingIndex].assignment : ''} />

            <label>Number of Weeks:</label>
            <input
              type="number"
              name="durationWeeks"
              min="1"
              value={durationWeeks}
              onChange={(e) => {
                const weeks = parseInt(e.target.value, 10);
                setDurationWeeks(weeks);
                setWeeklyTopics(prev =>
                  Array.from({ length: weeks }, (_, i) => prev[i] || { title: "", notes: "", resourceLink: "", fileName: "", fileData: "" })
                );
              }}
              required
            />

            {weeklyTopics.map((topic, index) => (
              <div key={index} className="topic-section">
                <input
                  type="text"
                  placeholder={`Topic for Week ${index + 1}`}
                  value={topic.title}
                  onChange={(e) => {
                    const updated = [...weeklyTopics];
                    updated[index].title = e.target.value;
                    setWeeklyTopics(updated);
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Optional Notes"
                  value={topic.notes}
                  onChange={(e) => {
                    const updated = [...weeklyTopics];
                    updated[index].notes = e.target.value;
                    setWeeklyTopics(updated);
                  }}
                />
                <input
                  type="text"
                  placeholder="Slide Link (Google Drive, etc.)"
                  value={topic.resourceLink}
                  onChange={(e) => {
                    const updated = [...weeklyTopics];
                    updated[index].resourceLink = e.target.value;
                    setWeeklyTopics(updated);
                  }}
                />
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.docx"
                  onChange={(e) => handleFileUpload(e, index)}
                />
                {topic.fileName && (
                  <p className="file-label">📎 {topic.fileName}</p>
                )}
              </div>
            ))}

            <label>Select Learning Days:</label>
            <select name="days" multiple required defaultValue={editingIndex !== null ? courses[editingIndex].days : []}>
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <button type="submit">{editingIndex !== null ? 'Update Course' : 'Save Course'}</button>
          </form>
        </>
      )}

      <div className="courses-list">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3><FaBook color='#1e40af' style={{ marginRight: '8px' }} /> {course.name}</h3>
            <p><strong><FaUser style={{ marginRight: '6px' }} />Instructor:</strong> {course.instructor}</p>
            <p><strong><FaCalendarAlt style={{ marginRight: '6px' }} />Next Day:</strong> {course.nextDay}</p>

            <div className="course-card-bottom">
              <div className="course-progress-row">
                <div className="course-progress-bar">
                  <div className="course-progress-fill" style={{ width: `${getProgress(course)}%` }}></div>
                </div>
                <span className="course-progress-label"> {getProgress(course)}% Completed</span>
              </div>
              <div className="card-buttons">
                <button className="resume-btn" id='rsm' onClick={() => navigate(`/resume-course/${course.id}`)}>
                  Resume Course
                </button>
                <button onClick={() => handleEdit(index)}><FaEdit /></button>
                <button onClick={() => handleDelete(index)}><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
