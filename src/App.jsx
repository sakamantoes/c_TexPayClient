
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./page/LandingPage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import ProtectedRoute from "./page/ProtectedRoute.jsx";
import MerchantDashboard from "./page/MerchantDashboard/MerchantDashboard.jsx";
import AdminDashboard from "./page/AdminDashboard/AdminDashboard.jsx";
import SuperAdminDashboard from "./page/SuperAdminDashboard/SuperAdminDashboard.jsx";
import { useAuthStore } from "./store/auth.store";
import { getDashboardPath } from "./utils/role.js";
import { FullScreenLoader } from "./components/Spin.jsx";
import VerifyEmailPage from "./page/VerifyEmailPage.jsx";
import VerifyEmailSentPage from "./page/VerifyEmailSentPage.jsx";

const DashboardRouter = () => {
  const { user } = useAuthStore();
  const targetPath = getDashboardPath(user);

  return <Navigate to={targetPath} replace />;
};

const AppRoutes = () => {
  const { initialized, getMe } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
<Route path="/verify-email-sent" element={<VerifyEmailSentPage />} />

      <Route
        path="/merchant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["merchant", "merchant_admin", "merchantadmin"]}>
            <MerchantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["super_admin", "superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
