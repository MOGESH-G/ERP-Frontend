import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function usePermission() {
  const permissions = useSelector((state: RootState) => state.auth.user?.permissions);

  const can = (resource: string, action: string) => {
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
