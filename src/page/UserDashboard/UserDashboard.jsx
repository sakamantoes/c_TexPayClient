import { useEffect, useMemo } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useMerchantStore } from "../../store/merchant.store";
import { useMerchantMemberStore } from "../../store/merchantMember.store";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { hasPermission } from "../../utils/permissions";

/*
|--------------------------------------------------------------------------
| NAV
|--------------------------------------------------------------------------
| Three states drive the workspace section:
|
|   ownsMerchant   → show "Business Profile" (owned business, editable)
|   isTeamMember   → show "My Team" (read-only, permission-gated)
|   neither        → show "Create Business" (become a merchant)
|--------------------------------------------------------------------------
*/
const buildUserNav = ({ permissions, ownsMerchant, isTeamMember }) => {
  const workspaceItems = [];

  // "Create Business" — only when the user has no workspace at all
  if (!ownsMerchant && !isTeamMember) {
    workspaceItems.push({
      key: "create-business",
      label: "Create Business",
      icon: "business",
      path: "/user/dashboard/create-business",
    });
  }

  // "Business Profile" — only when the user OWNS the business
  if (ownsMerchant) {
    workspaceItems.push({
      key: "business-profile",
      label: "Business Profile",
      icon: "business",
      path: "/user/dashboard/business",
    });
  }

  // "My Team" — whenever the user is part of a merchant (owner or member)
  if (ownsMerchant || isTeamMember) {
    workspaceItems.push({
      key: "team",
      label: ownsMerchant ? "My Team" : "My Team",
      icon: "team",
      path: "/user/dashboard/team",
    });
  }

  return [
    {
      title: "Account",
      items: [
        {
          key: "overview",
          label: "Overview",
          icon: "dashboard",
          path: "/user/dashboard/overview",
        },
        {
          key: "profile",
          label: "My Profile",
          icon: "profile",
          path: "/user/dashboard/profile",
        },
        {
          key: "notifications",
          label: "Notifications",
          icon: "notifications",
          path: "/user/dashboard/notifications",
        },
      ],
    },
    ...(workspaceItems.length > 0
      ? [{ title: "Workspace", items: workspaceItems }]
      : []),
  ];
};

export default function UserDashboard() {
  const location = useLocation();
  const { user } = useAuthStore();
  const {
    merchant,
    membership,
    businessProfile,
    membershipMerchant,
    roles,
    permissions,
    getMyMerchant,
    getMyMembership,
  } = useMerchantStore();
  const { getMyNotifications, getUnreadNotificationCount } =
    useMerchantMemberStore();

  useEffect(() => {
    getMyMerchant().catch(() => {});
    getMyMembership().catch(() => {});
    getMyNotifications().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ownsMerchant = Boolean(merchant);
  const isTeamMember = Boolean(membership);

  const navSections = useMemo(
    () => buildUserNav({ permissions, ownsMerchant, isTeamMember }),
    [permissions, ownsMerchant, isTeamMember]
  );

  const displayName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.email ||
    "User";

  const primaryRole = roles[0]?.name || "Member";

  // Subtitle: owned merchant > membership merchant > generic
  const subtitle =
    businessProfile?.businessName ||
    membershipMerchant?.businessProfile?.businessName ||
    "Your account";

  if (location.pathname === "/user/dashboard") {
    return <Navigate to="/user/dashboard/overview" replace />;
  }

  return (
    <DashboardLayout
      title="User Dashboard"
      subtitle={subtitle}
      navSections={navSections}
      profileName={displayName}
      profileRole={primaryRole}
      notificationCount={getUnreadNotificationCount()}
    >
      <Outlet />
    </DashboardLayout>
  );
}