import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../Componenets/Toast";
import '../css/forgot-password.css'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1=email, 2=answer, 3=reset
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      showToast("Email not found", "error");
      return;
    }

    setSecurityQuestion(foundUser.securityQuestion);
    setUser(foundUser);
    setStep(2);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (user.securityAnswer.toLowerCase().trim() === answer.toLowerCase().trim()) {
      setStep(3);
    } else {
      showToast("Incorrect answer", "error");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    showToast("Password successfully reset", "success");
    navigate("/login");
  };

  return (
    <div className="forgot-password-page">
      <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleAnswerSubmit : handleResetPassword} className="forgot-password-form">
        <h2>Forgot Password?</h2>

        {step === 1 && (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Continue</button>
          </>
        )}

        {step === 2 && (
          <>
            <p><strong>Security Question:</strong></p>
            <p>{securityQuestion}</p>
            <input
              type="text"
              placeholder="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">Verify Answer</button>
          </>
        )}

        {step === 3 && (
          <>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <button type="submit">Reset Password</button>
          </>
        )}

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

export default ForgotPassword;
