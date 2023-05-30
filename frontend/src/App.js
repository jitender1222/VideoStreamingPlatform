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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
