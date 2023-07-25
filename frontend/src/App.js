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
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getMyProfile } from "./Redux/Actions/user";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./component/Layout/Loader/Loader";

function App() {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/request" element={<Request />} />
              <Route path="/courses" element={<Course />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={true}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/changePassword"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateProfile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute isAuthenticated={true} redirect="/profile">
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    redirect="/login"
                  >
                    <Subscribe />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/paymentfail" element={<PaymentFail />} />

              {/* Admin Routes */}

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                    redirect="/login"
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/createCourse"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                    redirect="/login"
                  >
                    <CreateCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                    redirect="/login"
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                    redirect="/login"
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
