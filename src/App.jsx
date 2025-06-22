import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Logged from "./pages/LoggedIn"
import Course from "./pages/Course";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import Resume from "./pages/ResumeCourse";
import Change from "./pages/Change-Password";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element ={<SignUp />} />
      <Route path="/welcome" element ={<Logged />} />
      <Route path="/courses" element ={<Course />} />
      <Route path="/schedule" element ={<Schedule />} />
      <Route path="/progress" element ={<Progress />} />
      <Route path="/resume-course" element ={<Resume />} />
      <Route path="/change-password" element ={<Change />} />
    </Routes>
  );
}

export default App;
