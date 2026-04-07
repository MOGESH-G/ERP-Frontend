import { Suspense, type ReactNode, type LazyExoticComponent, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../components/Loader";

export interface PublicRouteConfig {
  path: string;
  element: LazyExoticComponent<() => ReactNode>;
  redirectIfAuth?: boolean;
}

interface PublicRoutesProps {
  isAuthenticated?: boolean;
  authRedirectTo?: string;
}

function useAuth(): { isAuthenticated: boolean } {
  const token = localStorage.getItem("token");
  return { isAuthenticated: !!token };
}

const LoginPage = lazy(() => import("../pages/auth/Login"));
// const RegisterPage = lazy(() => import("../pages/public/Register"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPassword"));
// const ResetPasswordPage  = lazy(() => import("../pages/public/ResetPassword"));
const NotFoundPage = lazy(() => import("../pages/auth/NotFound"));

// ─── Public route definitions ─────────────────────────────────────────────────

const PUBLIC_ROUTES: PublicRouteConfig[] = [
  {
    path: "login",
    element: LoginPage,
    redirectIfAuth: true,
  },
  //   {
  //     path: "register",
  //     element: RegisterPage,
  //     redirectIfAuth: true,
  //   },
  {
    path: "forgot-password",
    element: ForgotPasswordPage,
    redirectIfAuth: true,
  },
  //   {
  //     path: "reset-password/:token",
  //     element: ResetPasswordPage,
  //     redirectIfAuth: true,
  //   },
];

// ─── Single guarded public route ──────────────────────────────────────────────

const DISABLE_AUTH = true;

interface GuardedPublicRouteProps {
  element: LazyExoticComponent<() => ReactNode>;
  redirectIfAuth: boolean;
  isAuthenticated: boolean;
  authRedirectTo: string;
}

function GuardedPublicRoute({
  element: Page,
  redirectIfAuth,
  isAuthenticated,
  authRedirectTo,
}: GuardedPublicRouteProps): ReactNode {
  if (!DISABLE_AUTH && redirectIfAuth && isAuthenticated) {
    return <Navigate to={authRedirectTo} replace />;
  }
  return <Page />;
}

export default function PublicRoutes({
  isAuthenticated: isAuthProp,
  authRedirectTo = "/app/dashboard",
}: PublicRoutesProps): ReactNode {
  const { isAuthenticated: isAuthFromHook } = useAuth();

  const isAuthenticated = isAuthProp !== undefined ? isAuthProp : isAuthFromHook;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Navigate to="/auth/login" replace />} />

        {PUBLIC_ROUTES.map(({ path, element, redirectIfAuth = false }) => (
          <Route
            key={path}
            path={path}
            element={
              <GuardedPublicRoute
                element={element}
                redirectIfAuth={redirectIfAuth}
                isAuthenticated={isAuthenticated}
                authRedirectTo={authRedirectTo}
              />
            }
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
