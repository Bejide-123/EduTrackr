import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile-modal.css";
import Toast from "../Componenets/Toast";
import Navbar from "../Componenets/Navbar2";

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    securityQuestion: "",
    securityAnswer: "",
    avatar: "", // 👤 added avatar
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) {
      navigate("/login");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === currentUser.email);
    if (foundUser) {
      setForm({ ...foundUser });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newAvatar = reader.result;
      setForm((prevForm) => ({ ...prevForm, avatar: newAvatar }));

      // Immediately save the new avatar to local storage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === currentUser.email ? { ...u, avatar: newAvatar } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      showToast("Avatar updated successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? { ...form } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    // Also update currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify({ ...form }));
    showToast("Profile updated successfully");
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== currentUser.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUser");

    showToast("Account deleted");
    navigate("/login");
  };

  return (
    <>
      <Navbar></Navbar>
    <div className="profile-modal">
      <div className="profile-header" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.2rem' }}>
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '0.2rem',
            left: '1.2rem',
            background: "#e0e7ff",
            border: "1px solid #1e40af",
            color: "#1e40af",
            fontSize: "1.1rem",
            cursor: "pointer",
            borderRadius: "6px",
            padding: "0.3rem 0.8rem",
            fontWeight: 500,
            boxShadow: "0 1px 4px rgba(30,64,175,0.08)"
          }}
        >
          ← Back
        </button>
        <div className="avatar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '0.1rem' }}>
          <img
            src={form.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            className="avatar-img"
            style={{ display: 'block', margin: '0 auto', marginTop: '0.1rem', width: '130px', height: '130px', objectFit: 'cover', borderRadius: '50%' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ marginTop: '0.15rem' }}
          />
        </div>
        <h2 style={{ margin: 0, textAlign: 'center' }}>Edit Profile</h2>
      </div>

      <div className="form-columns">
          <div className="form-column">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                disabled
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Security Question</label>
              <select
                name="securityQuestion"
                value={form.securityQuestion}
                onChange={handleChange}
              >
                <option value="">Select a question</option>
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

            <div className="form-group">
              <label>Answer</label>
              <input
                name="securityAnswer"
                value={form.securityAnswer}
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="btn save" onClick={handleSave}>Save Changes</button>
          <button className="btn delete" onClick={handleDelete}>Delete Account</button>
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

export default Profile;