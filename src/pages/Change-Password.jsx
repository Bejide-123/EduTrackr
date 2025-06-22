import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import "../css/Change.css"
import Toast from "../Componenets/Toast";

const Change = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    password: "",
    password1: "",
    password2: ""
  });

  const showToast = (message, type = 'success') => {
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
    if (form.password === "") {
      setError("Enter current password.");
      showToast("Enter current password.", "error");
    } else if (form.password1 === "" || form.password2 === "") {
      setError("Enter and confirm your new password.");
      showToast("New password fields cannot be empty.", "error");
    } else if (form.password1 !== form.password2) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "error");
    } else {
      setError("");
      showToast("Password changed successfully!", "success");
      // Call your backend or local storage logic here
    }
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
                  placeholder="Password"
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

            <button type="submit" className="submit-btn">Change Password</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Change;
