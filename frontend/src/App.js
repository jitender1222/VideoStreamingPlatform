import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Header from "./component/Layout/Header/Header";
import Course from "./component/courses/Course";
import Footer from "./component/Layout/Footer/Footer";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import ForgetPassword from "./component/Auth/ForgetPassword";
import ResetPassword from "./component/Auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
