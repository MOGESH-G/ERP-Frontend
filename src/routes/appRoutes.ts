import { lazy, type LazyExoticComponent, type ReactNode } from "react";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<() => ReactNode>;
  resource: string;
  action: string;
  label?: string;
  icon?: ReactNode;
  showInMenu?: boolean;
  children?: AppRoute[];
  title?: string;
}

const DashboardPage = lazy(() => import("../pages/app/Dashboard"));
const ProfilePage = lazy(() => import("../pages/app/users/Profile"));
const PasswordPage = lazy(() => import("../pages/app/users/ChangePassword"));
const UsersPage = lazy(() => import("../pages/app/users/Users"));
const CreateUserPage = lazy(() => import("../pages/app/users/CreateUser"));
// const SettingsPage = lazy(() => import("../pages/private/SettingsPage"));
// const ProfilePage = lazy(() => import("../pages/private/ProfilePage"));
// const ReportsPage = lazy(() => import("../pages/private/ReportsPage"));
// const AdminPage = lazy(() => import("../pages/private/AdminPage"));
// const ForbiddenPage = lazy(() => import("../pages/ForbiddenPage"));
// const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const APP_ROUTES: AppRoute[] = [
  {
    path: "dashboard",
    element: DashboardPage,
    resource: "dashboard",
    action: "view",
    label: "Dashboard",
    showInMenu: true,
  },
  {
    path: "profile",
    element: ProfilePage,
    resource: "profile",
    action: "view",
    label: "Profile",
    showInMenu: true,
  },
  {
    path: "profile/change-password",
    element: PasswordPage,
    resource: "change-password",
    action: "view",
    label: "Change Password",
    showInMenu: true,
  },
  {
    path: "users",
    element: UsersPage,
    resource: "users",
    action: "view",
    label: "Create User",
    showInMenu: true,
  },
  {
    path: "users/create-user",
    element: CreateUserPage,
    resource: "create-user",
    action: "create",
    label: "Create User",
    showInMenu: true,
  },
];

export const SHOP_ROUTES: AppRoute[] = [
  // {
  //   path: "list",
  //   element: lazy(() => import("../pages/app/shops/List")),
  //   resource: "shops",
  //   action: "view",
  //   label: "Shop List",
  //   showInMenu: true,
  // },
  // {
  //   path: "create",
  //   element: lazy(() => import("../pages/app/shops/Create")),
  //   resource: "shops",
  //   action: "create",
  //   label: "Create Shop",
  // },
  // {
  //   path: ":id",
  //   element: lazy(() => import("../pages/app/shops/View")),
  //   resource: "shops",
  //   action: "view",
  // },
  // {
  //   path: ":id/edit",
  //   element: lazy(() => import("../pages/app/shops/Edit")),
  //   resource: "shops",
  //   action: "update",
  // },
];
