import '../css/Assignment.css';
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';

const Assignment = ({ showToast }) => {
  const [userEmail, setUserEmail] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [course, setCourse] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo?.email) {
      setUserEmail(loginInfo.email);
    }
  }, []);

  // ✅ Load assignments for that user
  useEffect(() => {
    if (userEmail) {
      const stored = localStorage.getItem(`assignments_${userEmail}`);
      if (stored) setAssignments(JSON.parse(stored));
    }
  }, [userEmail]);

  // ✅ Save to localStorage on every change
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`assignments_${userEmail}`, JSON.stringify(assignments));
    }
  }, [assignments, userEmail]);

  const toggleForm = () => {
    setShowForm(prev => !prev);
    setCourse('');
    setTitle('');
    setDueDate('');
    setDescription('');
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = { course, title, dueDate, description };

    if (editIndex !== null) {
      const updated = [...assignments];
      updated[editIndex] = newAssignment;
      setAssignments(updated);
      showToast('Assignment updated successfully', 'success');
    } else {
      setAssignments(prev => [newAssignment, ...prev]);
      showToast('Assignment added successfully', 'success');
    }

    toggleForm();
  };

  const handleDelete = (index) => {
    const updated = assignments.filter((_, i) => i !== index);
    setAssignments(updated);
    showToast('Assignment deleted successfully', 'error');
  };

  const handleEdit = (index) => {
    const item = assignments[index];
    setCourse(item.course);
    setTitle(item.title);
    setDueDate(item.dueDate);
    setDescription(item.description);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="assignment-container">
      <div className="headings">
        <h2>Assignments</h2>
        {!showForm && (
          <button className="add-course-icon" onClick={toggleForm} title="Add Assignment">
            <FaPlus size={20} />
          </button>
        )}
      </div>

      <div className="assignments">
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{editIndex !== null ? 'Edit Assignment' : 'Add Assignment'}</h3>
              <form className="assignment-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Course name"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Assignment Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description or Instructions"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="form-buttons">
                  <button type="button" id='cancel' onClick={toggleForm}>Cancel</button>
                  <button type="submit">{editIndex !== null ? 'Update' : 'Add'} Assignment</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {assignments.map((item, index) => (
          <div key={index} className="assignment-card">
            <h2><FaBook />  {item.course}</h2>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="assignment-actions">
              <div className="ts">
                <small>Due: {item.dueDate}</small>
              </div>
              <div className="btts">
                <button onClick={() => handleEdit(index)}><FaEdit color='#1e40af' size={16} /></button>
                <button onClick={() => handleDelete(index)}><FaTrash color='red' size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignment;
