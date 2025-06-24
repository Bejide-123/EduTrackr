import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import "../css/Change.css";
import Toast from "../Componenets/Toast";
import { useNavigate } from "react-router-dom";

const Change = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Logged-in user

  const [form, setForm] = useState({
    password: "",
    password1: "",
    password2: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userIndex = users.findIndex((u) => u.email === currentUser?.email);

    if (userIndex === -1) {
      setError("User not found.");
      showToast("User not found.", "error");
      return;
    }

    if (form.password === "") {
      setError("Enter current password.");
      showToast("Enter current password.", "error");
      return;
    }

    if (users[userIndex].password !== form.password) {
      setError("Current password is incorrect.");
      showToast("Incorrect current password.", "error");
      setForm({
      password: ""
    });
      return;
    }

    if (form.password1 === "" || form.password2 === "") {
      setError("New password fields cannot be empty.");
      showToast("New password fields cannot be empty.", "error");
      return;
    }

    if (form.password1 !== form.password2) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "error");
      setForm({
      password1: "",
      password2: "",
    });
      return;
    }

    // ✅ All checks passed: update password
    users[userIndex].password = form.password1;
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    showToast("Password changed successfully!", "success");
    setTimeout(() => {
      navigate("/welcome")
    }, 1500);


    // Optionally reset form fields
    setForm({
      password: "",
      password1: "",
      password2: "",
    });
  };

  return (
    <>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
      )}

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h2>Change Password</h2>
          </div>
          <div className="fields">
            <div className="input-group">
              <label htmlFor="password">Current Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Current Password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password1">New Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password1"
                  type="password"
                  name="password1"
                  placeholder="New Password"
                  value={form.password1}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password2">Confirm New Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={form.password2}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Change;
