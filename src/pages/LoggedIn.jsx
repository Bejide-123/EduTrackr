import React, { useState } from "react";
import Navbar from "../Componenets/Navbar2";
import "../css/LoggedIn.css";
import Dashboard from "../Componenets/Dasboard";
import Course from "../Componenets/Courses";
import Toast from "../Componenets/Toast";
import { PageLoader } from "../Componenets/Loaders";
import { useEffect } from "react";

const Logged = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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

  return (
    <div className="page">
      <Navbar />
      <Dashboard />
      <Course showToast={showToast} />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default Logged;
