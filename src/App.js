import { Routes, Route } from "react-router-dom";

/* ---------- Public Layout ---------- */
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* ---------- Public Pages ---------- */
import Home from "./pages/Home";
import About from "./pages/About";
import Brochure from "./pages/Brochure";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Apply from "./pages/Apply";

/* ---------- Admin Pages ---------- */
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminApplications from "./admin/pages/AdminApplications";
import AdminApplicationDetail from "./admin/pages/AdminApplicationDetail";
import AdminSettings from "./admin/pages/AdminSettings";

/* ---------- Admin Utilities ---------- */
import ProtectedAdminRoute from "./admin/routes/ProtectedAdminRoute";
import AdminLayout from "./admin/layout/AdminLayout";

/* ---------- Employee Pages ---------- */
import EmployeeDashboard from "./employee/pages/EmployeeDashboard";
import EmployeeLogin from "./employee/pages/EmployeeLogin";


/* ---------- Employee Utilities ---------- */
import ProtectedEmployeeRoute from "./employee/routes/ProtectedEmployeeRoute";

function App() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        }
      />

      <Route
        path="/brochure"
        element={
          <>
            <Navbar />
            <Brochure />
            <Footer />
          </>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Login />
            <Footer />
          </>
        }
      />

      <Route
        path="/apply"
        element={
          <>
            <Navbar />
            <Apply />
            <Footer />
          </>
        }
      />

      {/* ---------- Admin Routes ---------- */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route
          path="applications/:id"
          element={<AdminApplicationDetail />}
        />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* ---------- Employee Routes ---------- */}
      <Route path="/employee/login" element={<EmployeeLogin />} />

      <Route
        path="/employee/dashboard"
        element={
          <ProtectedEmployeeRoute>
            <EmployeeDashboard />
          </ProtectedEmployeeRoute>
        }
      />
    </Routes>
  );
}

export default App;
