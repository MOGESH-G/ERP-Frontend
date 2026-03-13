import { type ReactNode, type LazyExoticComponent, lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { usePermission } from "../hooks/usePermisson";
import { APP_ROUTES } from "./appRoutes";

export interface PrivateRouteConfig {
  path: string;
  element: LazyExoticComponent<() => ReactNode>;
  resource: string; // For permission checks, e.g. "dashboard", "employees"
  action: string; // For permission checks, e.g. "view", "edit", "delete"
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string[];
  permissions: Record<string, Record<string, boolean>>;
  avatarUrl?: string;
}

interface PrivateRoutesProps {
  isAuthenticated?: boolean;
  user?: AuthUser | null;
  loginPath?: string;
  forbiddenPath?: string;
}

function useAuth(): { isAuthenticated: boolean; user: AuthUser | null } {
  const token = localStorage.getItem("token");
  return { isAuthenticated: !!token, user: null };
}

const AppLayout = lazy(() => import("../components/layouts/AppLayout"));

interface AuthGuardProps {
  isAuthenticated: boolean;
  loginPath: string;
}

function AuthGuard({ isAuthenticated, loginPath }: AuthGuardProps): ReactNode {
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }
  return <Outlet />;
}

interface PermissionGuardProps {
  resource: string;
  action: string;
  forbiddenPath: string;
  element: LazyExoticComponent<() => ReactNode>;
}

function PermissionGuard({
  resource,
  action,
  forbiddenPath,
  element: Page,
}: PermissionGuardProps): ReactNode {
  const { can } = usePermission();
  console.log("Checking permission for resource:", resource, "action:", action);
  if (!can(resource, action)) {
    return <Navigate to={forbiddenPath} replace />;
  }

  return <Page />;
}

const ForbiddenPage = lazy(() => import("../pages/private/Forbidden"));
const NotFound = lazy(() => import("../pages/private/NotFound"));

export default function PrivateRoutes({
  isAuthenticated: isAuthProp,
  loginPath = "/auth/login",
  forbiddenPath = "/app/forbidden",
}: PrivateRoutesProps): ReactNode {
  const { isAuthenticated: isAuthFromHook } = useAuth();

  const isAuthenticated = isAuthProp !== undefined ? isAuthProp : isAuthFromHook;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthGuard isAuthenticated={isAuthenticated} loginPath={loginPath} />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            {APP_ROUTES.map(({ path, element, resource, action }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PermissionGuard
                    resource={resource}
                    action={action}
                    forbiddenPath={forbiddenPath}
                    element={element}
                  />
                }
              />
            ))}

            <Route path="forbidden" element={<ForbiddenPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
