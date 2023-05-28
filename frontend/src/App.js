import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Header from "./component/Layout/Header/Header";
import Course from "./component/courses/Course";
import Footer from "./component/Layout/Footer/Footer";
import Login from "./component/Auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
