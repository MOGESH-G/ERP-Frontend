/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type ReactNode,
  type LazyExoticComponent,
  lazy,
  Suspense,
  // useEffect,
  // useRef,
  // useState,
} from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
// import { usePermission } from "../hooks/usePermisson";
import { APP_ROUTES } from "./appRoutes";
// import { verifyUser } from "../api/auth";
// import { loginSuccess, logoutSuccess } from "../slices/authSlice";
// import type { RootState } from "../store";

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

// Temporarily disabled for development without backend
// function useAuth(): { isAuthenticated: boolean; user: AuthUser | null } {
//   const token = localStorage.getItem("token");
//   return { isAuthenticated: !!token, user: null };
// }

const AppLayout = lazy(() => import("../components/layouts/AppLayout"));
const HomePage = lazy(() => import("../pages/private/Home"));

// Temporarily disabled for development without backend
// interface AuthGuardProps {
//   isAuthenticated: boolean;
//   loginPath: string;
// }

// function AuthGuard({ isAuthenticated, loginPath }: AuthGuardProps): ReactNode {
//   if (!isAuthenticated) {
//     return <Navigate to={loginPath} replace />;
//   }
//   return <Outlet />;
// }

// interface PermissionGuardProps {
//   resource: string;
//   action: string;
//   forbiddenPath: string;
//   element: LazyExoticComponent<() => ReactNode>;
// }

// function PermissionGuard({
//   resource,
//   action,
//   forbiddenPath,
//   element: Page,
// }: PermissionGuardProps): ReactNode {
//   const { can } = usePermission();
//   console.log("Checking permission for resource:", resource, "action:", action);
//   if (!can(resource, action)) {
//     return <Navigate to={forbiddenPath} replace />;
//   }

//   return <Page />;
// }

const ForbiddenPage = lazy(() => import("../pages/private/Forbidden"));
const NotFound = lazy(() => import("../pages/private/NotFound"));

// Set to true to disable auth checks for development
const DISABLE_AUTH_CHECKS = true;

export default function PrivateRoutes({
  isAuthenticated: isAuthProp,
  loginPath = "/auth/login",
  forbiddenPath = "/app/forbidden",
}: PrivateRoutesProps): ReactNode {
  // Temporarily disabled for development without backend
  // const { isAuthenticated: isAuthFromHook } = useAuth();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const currentUser = useSelector((state: RootState) => state.auth.user);
  // const currentToken = useSelector((state: RootState) => state.auth.token);
  // const [isVerifying, setIsVerifying] = useState(true);
  // const verificationStarted = useRef(false);

  // const isAuthenticated = isAuthProp !== undefined ? isAuthProp : isAuthFromHook;

  // useEffect(() => {
  //   if (verificationStarted.current) {
  //     return;
  //   }

  //   verificationStarted.current = true;

  //   const verify = async () => {
  //     if (!currentToken) {
  //       setIsVerifying(false);
  //       return;
  //     }

  //     if (currentUser) {
  //       setIsVerifying(false);
  //       return;
  //     }

  //     try {
  //       const user = await verifyUser();
  //       dispatch(loginSuccess({ user, token: currentToken }));
  //     } catch (err) {
  //       console.error("Verify user failed", err);
  //       dispatch(logoutSuccess());
  //       navigate("/auth/login", { replace: true });
  //     } finally {
  //       setIsVerifying(false);
  //     }
  //   };

  //   verify();
  // }, [currentToken, currentUser, dispatch, navigate]);

  // if (isVerifying) {
  //   return <Loader />;
  // }

  if (DISABLE_AUTH_CHECKS) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />

          {APP_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={<element />} />
          ))}

          <Route path="shops/*" element={<AppLayout />} />

          <Route path="forbidden" element={<ForbiddenPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    );
  }

  // Original auth-enabled code (commented out)
  // return (
  //   <Suspense fallback={<Loader />}>
  //     <Routes>
  //       <Route element={<AuthGuard isAuthenticated={isAuthenticated} loginPath={loginPath} />}>
  //         <Route index element={<Navigate to="home" replace />} />
  //         <Route path="home" element={<HomePage />} />

  //         {APP_ROUTES.map(({ path, element, resource, action }) => (
  //           <Route
  //             key={path}
  //             path={path}
  //             element={
  //               <PermissionGuard
  //                 resource={resource}
  //                 action={action}
  //                 forbiddenPath={forbiddenPath}
  //                 element={element}
  //               />
  //             }
  //           />
  //         ))}

  //         <Route path="shops/*" element={<AppLayout />} />

  //         <Route path="forbidden" element={<ForbiddenPage />} />

  //         <Route path="*" element={<NotFound />} />
  //       </Route>
  //     </Routes>
  //   </Suspense>
  // );
}
