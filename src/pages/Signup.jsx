import "../css/signup.css";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../Componenets/Toast";
const SignUp = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
    const showToast = (message, type = 'success') => {
      setToast({ show: true, message, type });
    };
  
    const handleCloseToast = () => {
      setToast({ ...toast, show: false });
    };
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Example validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === form.email)) {
      setError("Email already registered.");
      showToast("Email already registered,Proceed to Login", "error");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Account Successfully Created", "success");
    navigate("/login");
  };
  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up for EduTrackr</h2>
        <p className="signup-subtitle">Create your account to get started</p>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="name">Full name</label>
          <div className="input-icon-wrapper">
            <FaUser className="input-icon" />
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="username"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon-wrapper">
            <FaLock className="input-icon" />
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              minLength="6"
              maxLength="20"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon-wrapper">
            <FaLock className="input-icon" />
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              minLength="6"
              maxLength="20"
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>

        <div className="dropdown">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            required
            value={form.role}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      </form>
    </div>
  );
};
export default SignUp;
