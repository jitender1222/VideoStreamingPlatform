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
import Contact from "./component/Contact/Contact";
import Request from "./component/Contact/Request";
import About from "./component/About/About";
import Subscribe from "./component/Layout/Payment/Subscribe";
import PaymentSuccess from "./component/Layout/Payment/PaymentSuccess";
import PaymentFail from "./component/Layout/Payment/PaymentFail";
import NotFound from "./component/Layout/NotFound/NotFound";
import CourseDetail from "./component/CourseDetail/CourseDetail";
import Profile from "./component/Profile/Profile";
import ChangePassword from "./component/Profile/ChangePassword";
import UpdateProfile from "./component/Profile/UpdateProfile";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
import CreateCourses from "./component/Admin/CreateCourses/CreateCourses";
import AdminCourses from "./component/Admin/AdminCourses/AdminCourses";
import Users from "./component/Admin/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />

        {/* Admin Routes */}

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createCourse" element={<CreateCourses />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
