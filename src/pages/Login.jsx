import React, { useState, useEffect } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Toast from "../Componenets/Toast";
import { PageLoader } from "../Componenets/Loaders";
import { ButtonLoader } from "../Componenets/Loaders";

const Login = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  // Handle initial page animation loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <PageLoader />;
  }

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      showToast("Please fill in all fields.", "error");
      setFormLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      const { ...userInfo } = user;
      localStorage.setItem("loginInfo", JSON.stringify(userInfo));
      localStorage.setItem("currentUser", JSON.stringify(user));
      showToast("Login Successful", "success");

      setTimeout(() => {
        setFormLoading(false); // Stop showing loader
        navigate("/welcome"); // Then redirect
      }, 1500);
    } else {
      setError("Invalid email or password.");
      showToast("Invalid email or password.", "error");
      setFormLoading(false); // Stop loader immediately on failure
    }
  };

  const handleGoogleSignIn = () => {
    alert(
      "Google sign-in coming soon! Please create an account using email and password."
    );
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to EduTrackr</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
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
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="login-links">
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={formLoading}>
          {formLoading ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Logging in <ButtonLoader />
            </span>
          ) : (
            "Login"
          )}
        </button>

        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
        >
          <span className="google-svg-icon" aria-hidden="true">
            <svg width="25" height="25" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4285F4"
                  d="M43.6 20.5h-1.9V20H24v8h11.3c-1.5 4-5.2 7-9.3 7-5.5 0-10-4.5-10-10s4.5-10 10-10c2.4 0 4.6.9 6.3 2.3l6.2-6.2C34.5 8.1 29.5 6 24 6 13.5 6 5 14.5 5 25s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.3-.1-2.5-.4-3.5z"
                />
                <path
                  fill="#34A853"
                  d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.4 0 4.6.9 6.3 2.3l6.2-6.2C34.5 8.1 29.5 6 24 6c-7.1 0-13.2 3.7-16.7 8.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.2-5.1C29.1 35.7 26.7 36.5 24 36.5c-4.1 0-7.8-3-9.3-7H6.3C8.8 39.2 15.8 44 24 44z"
                />
                <path
                  fill="#EA4335"
                  d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-3.8 4.9l6.2 5.1C41.7 36.1 44 31.1 44 25c0-1.3-.1-2.5-.4-3.5z"
                />
              </g>
            </svg>
          </span>
          Sign in with Google
        </button>

        <div className="signup-link">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

// Login.jsx
// import { SignIn } from "@clerk/clerk-react";

// export default function Login() {
//   return (
//     <div style={{ marginTop: "3rem" }}>
//       <SignIn routing="hash" signInForceRedirectUrl={"/welcome"} />
//     </div>
//   );
// }
