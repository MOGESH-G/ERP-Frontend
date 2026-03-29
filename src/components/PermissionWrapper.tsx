import type { ReactNode } from "react";

export interface PermissionProps {
  allowed?: boolean;

  fallback?: ReactNode;

  children: ReactNode;
}

export default function Permission({ allowed = true, fallback = null, children }: PermissionProps) {
  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
}
