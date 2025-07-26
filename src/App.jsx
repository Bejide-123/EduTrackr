import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Logged from "./pages/LoggedIn";
import Course from "./pages/Course";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import Resume from "./pages/ResumeCourse";
import Change from "./pages/Change-Password";
import ForgotPassword from "./pages/Forgot-password";
import Profile from "./pages/Profile";
import Settings from "./pages/settings"; 
import Notification from "./Componenets/Notification";
import Certificate from "./Componenets/Certificate";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/certificate" element={<Certificate />} />
      {/* Protected Routes */}
      <Route
        path="/welcome"
        element={
          
            <Logged />
          
        }
      />
      <Route
        path="/courses"
        element={
          <Course />
        }
      />
      <Route
        path="/schedule"
        element={
          <SignedIn>
            <Schedule />
          </SignedIn>
        }
      />
      <Route
        path="/progress"
        element={
          <SignedIn>
            <Progress />
          </SignedIn>
        }
      />
      <Route
        path="/resume-course/:id"
        element={
          
            <Resume />
          
        }
      />
      <Route
        path="/change-password"
        element={
          <SignedIn>
            <Change />
          </SignedIn>
        }
      />
      <Route
        path="/profile"
        element={
          <SignedIn>
            <Profile />
          </SignedIn>
        }
      />

      {/* Redirect to sign in if not logged in */}
      <Route
        path="*"
        element={
          <>
            <SignedIn>
              <RedirectToSignIn redirectUrl="/welcome" />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;
