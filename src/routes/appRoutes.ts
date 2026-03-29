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

const DashboardPage = lazy(() => import("../pages/private/Dashboard"));
// const EmployeesPage = lazy(() => import("../pages/private/EmployeesPage"));
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
    // icon: <DashboardIcon />,
    showInMenu: true,
  },
  //   {
  //     path: "users",
  //     element: UsersPage,
  //     resource: "users",
  //     action: "view",

  //     label: "Users",
  //     icon: <PeopleIcon />,
  //     showInMenu: true,

  //     children: [
  //       {
  //         path: "create",
  //         element: CreateUserPage,
  //         resource: "users",
  //         action: "create",
  //       },
  //     ],
  //   },
];
