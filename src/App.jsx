import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import AcceptInvitationPage from "./page/AcceptInvitationPage.jsx";

import UserDashboard from "./page/UserDashboard/UserDashboard.jsx";
import OverviewPage from "./page/UserDashboard/OverviewPage.jsx";
import ProfilePage from "./page/UserDashboard/ProfilePage.jsx";
import NotificationsPage from "./page/UserDashboard/NotificationsPage.jsx";
import CreateBusinessPage from "./page/UserDashboard/CreateBusinessPage.jsx";

import CustomersPage from "./page/MerchantDashboard/CustomersPage.jsx";
import TeamMembersPage from "./page/MerchantDashboard/TeamMembersPage.jsx";
import RolesPage from "./page/MerchantDashboard/RolesPage.jsx";
import ApiKeysPage from "./page/MerchantDashboard/ApiKeysPage.jsx";

import PermissionGuard from "./components/guards/PermissionGuard.jsx";

// 👇 Aliased imports — two different BusinessProfilePage files
import MerchantBusinessProfilePage from "./page/MerchantDashboard/BusinessProfilePage.jsx";
import UserBusinessProfilePage from "./page/UserDashboard/BusinessProfilePage.jsx";

const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // USERs go straight to their nested dashboard
  if (user?.role === ROLES.USER) {
    return <Navigate to="/user/dashboard/overview" replace />;
  }

  return <Navigate to={getDashboardPath(user)} replace />;
};

const AppRoutes = () => {
  const {
    initialized,
    getMe,
    isAuthenticated,
    verificationRequired,
    verificationEmail,
  } = useAuthStore();
  const location = useLocation();
  const hasBootstrappedSession = useRef(false);

  useEffect(() => {
    if (hasBootstrappedSession.current) return;
    hasBootstrappedSession.current = true;
    getMe();
  }, [getMe]);

  if (!initialized) {
    return <FullScreenLoader />;
  }

  if (
    verificationRequired &&
    location.pathname !== "/verify-email-sent" &&
    location.pathname !== "/verify-email"
  ) {
    const email = verificationEmail
      ? `?email=${encodeURIComponent(verificationEmail)}`
      : "";
    return <Navigate to={`/verify-email-sent${email}`} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      {/*
      |----------------------------------------------------------------------
      | /dashboard — route dispatcher by role
      |----------------------------------------------------------------------
      */}
      <Route
        path="/dashboard"
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

      {/*
      |----------------------------------------------------------------------
      | USER DASHBOARD (nested)
      |----------------------------------------------------------------------
      */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.USER]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="create-business" element={<CreateBusinessPage />} />
        <Route path="business" element={<UserBusinessProfilePage />} />
      </Route>

      {/*
      |----------------------------------------------------------------------
      | AUTH FLOW
      |----------------------------------------------------------------------
      */}
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSentPage />} />
      <Route path="/accept-invitation" element={<AcceptInvitationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.USER,
              ROLES.MERCHANT,
              ROLES.ADMIN,
              ROLES.SUPER_ADMIN,
            ]}
          >
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />

      {/*
      |----------------------------------------------------------------------
      | MERCHANT DASHBOARD
      |----------------------------------------------------------------------
      */}
      <Route
        path="/merchant/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MERCHANT]}>
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
            <PermissionGuard permission="merchants.read">
              <MerchantBusinessProfilePage />
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

      {/*
      |----------------------------------------------------------------------
      | ADMIN + SUPER ADMIN
      |----------------------------------------------------------------------
      */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">
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