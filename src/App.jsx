import { useEffect } from "react";
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
import { getDashboardPath, ROLES } from "./utils/role.js";
import { FullScreenLoader } from "./components/Spin.jsx";
import VerifyEmailPage from "./page/VerifyEmailPage.jsx";
import VerifyEmailSentPage from "./page/VerifyEmailSentPage.jsx";
import UserDashboard from "./page/UserDashboard/UserDashboard.jsx";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import CustomersPage from "./page/MerchantDashboard/CustomersPage.jsx";
import PermissionGuard from "./components/guards/PermissionGuard.jsx";
import TeamMembersPage from "./page/MerchantDashboard/TeamMembersPage.jsx";
import RolesPage from "./page/MerchantDashboard/RolesPage.jsx";
import BusinessProfilePage from "./page/MerchantDashboard/BusinessProfilePage.jsx";
import ApiKeysPage from "./page/MerchantDashboard/ApiKeysPage.jsx";

const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === ROLES.USER) {
    return <UserDashboard />;
  }

  return <Navigate to={getDashboardPath(user)} replace />;
};

const AppRoutes = () => {
  // ✅ Pull everything we need from the store
  const { initialized, getMe, isAuthenticated } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (!initialized) {
    return <FullScreenLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.USER, ROLES.MERCHANT, ROLES.ADMIN, ROLES.SUPER_ADMIN]}
          >
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/onboarding/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.USER,
              ROLES.MERCHANT,
              ROLES.ADMIN,
              ROLES.SUPER_ADMIN,
            ]}
          >
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSentPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/change-password"
        element={
          isAuthenticated ? (
            <ChangePasswordPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

{/* for merchant dashboard */}
      <Route
        path="/merchant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["MERCHANT"]}>
            <MerchantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant/dashboard/customers"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
            <PermissionGuard permission="customers.read">
              <CustomersPage />
            </PermissionGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant/dashboard/business"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
            <PermissionGuard permission="business.read">
              <BusinessProfilePage />
            </PermissionGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant/dashboard/api-keys"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
            <PermissionGuard permission="api_keys.read">
              <ApiKeysPage />
            </PermissionGuard>
          </ProtectedRoute>
        }
      />

      

     <Route
        path="/merchant/dashboard/team"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
           <PermissionGuard permission="team.read">
      <TeamMembersPage />
    </PermissionGuard>
          </ProtectedRoute>
        }
      />

      <Route
  path="/merchant/dashboard/roles"
  element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
            <PermissionGuard permission="roles.read">
              <RolesPage />
            </PermissionGuard>
          </ProtectedRoute>
        }
      />

{/* for admin dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
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