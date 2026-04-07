import { useSelector } from "react-redux";
import type { RootState } from "../store";

// Set to true to disable permission checks for development
const DISABLE_PERMISSION_CHECKS = true;

export function usePermission() {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.permissions,
  );

  const can = (resource: string, action: string) => {
    if (DISABLE_PERMISSION_CHECKS) {
      // Temporarily allow all permissions for development without backend
      return true;
    }

    console.log(resource, action, permissions);
    return permissions?.[resource]?.[action] === true;
  };

  return { can };
}

// {
//   "users": {
//     "view": true,
//     "create": true,
//     "update": false,
//     "delete": false
//   },
//   "orders": {
//     "view": true,
//     "create": true,
//     "cancel": false
//   },
//   "products": {
//     "view": true
//   }
// }
