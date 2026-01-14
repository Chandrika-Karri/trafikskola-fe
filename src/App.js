import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyBookings from "./pages/MyBookings";
import AdminPanel from "./pages/AdminPanel";
import Bookings from "./pages/Bookings";
import PrivateRoute from "./components/PrivateRoute";
import TimeSlots from "./pages/TimeSlots";  
import AdminSlots from "./pages/AdminSlots";
import ChangePasswordForm from "./components/ChangePasswordForm";
import AdminManagement from "./pages/AdminManagement";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import ResetPasswordForm from "./pages/ResetPasswordForm";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId/slots" element={<TimeSlots />} />

        {/* Student-only routes */}
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute role="STUDENT">
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <AdminPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/change-password"
          element={
          <PrivateRoute role="ADMIN">
          <ChangePasswordForm />
        </PrivateRoute>
  }
/>

        <Route
          path="/bookings"
          element={
            <PrivateRoute role="ADMIN">
              <Bookings />
            </PrivateRoute>
          }
        />
        

        <Route
          path="/admin/slots"
          element={
            <PrivateRoute role="ADMIN">
              <AdminSlots />
            </PrivateRoute>
         }
       />

       <Route
         path="/admin/manage-admins"
         element={
        <PrivateRoute role="SUPER_ADMIN">
          <AdminManagement />
        </PrivateRoute>
    }
/>



        {/* Fallback: redirect unknown routes to home */}
        <Route path="*" element={<Home />} />

        <Route path = "/forgot-password" element={<ForgotPasswordForm />} />
        <Route path = "/reset-password" element={<ResetPasswordForm />} />
      </Routes>
    </Router>
  );
}

export default App;
