// Add to your existing imports at the top
import "../css/signup.css";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaQuestionCircle } from "react-icons/fa"; // added icon
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
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "error");
      return;
    }

    if (!form.securityQuestion || !form.securityAnswer) {
      showToast("Please complete the security question.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === form.email)) {
      setError("Email already registered.");
      showToast("Email already registered. Proceed to Login", "error");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      securityQuestion: form.securityQuestion,
      securityAnswer: form.securityAnswer.toLowerCase().trim(), // store normalized
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
          <label htmlFor="confirmPassword">Confirm Password</label>
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
            <option value="" disabled>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        {/* 🔐 Security Question Dropdown */}
        <div className="dropdown">
          <label htmlFor="securityQuestion">Security Question</label>
          <select
            id="securityQuestion"
            name="securityQuestion"
            required
            value={form.securityQuestion}
            onChange={handleChange}
          >
            <option value="" disabled>Select a security question</option>
            <option value="What is your favorite color?">What is your favorite color?</option>
            <option value="What was the name of your first pet?">What was the name of your first pet?</option>
            <option value="What city were you born in?">What city were you born in?</option>
            <option value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
            <option value="What is your favorite food?">What is your favorite food?</option>
            <option value="What is the name of your primary school?">What is the name of your primary school?</option>
            <option value="What was your childhood nickname?">What was your childhood nickname?</option>
            <option value="What is your favorite movie?">What is your favorite movie?</option>
            <option value="What is the name of your best friend in high school?">What is the name of your best friend in high school?</option>
            <option value="What is your dream job?">What is your dream job?</option>
          </select>
        </div>

        {/* 🔐 Security Answer Field */}
        <div className="input-group">
          <label htmlFor="securityAnswer">Answer</label>
          <div className="input-icon-wrapper">
            <FaQuestionCircle className="input-icon" />
            <input
              id="securityAnswer"
              type="text"
              name="securityAnswer"
              placeholder="Answer to security question"
              required
              value={form.securityAnswer}
              onChange={handleChange}
            />
          </div>
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
