import React from "react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbProps {
  rootDir: string; // e.g., "/app"
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ rootDir }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Split the path into segments after removing rootDir
  const segments = currentPath.replace(rootDir, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Build path for each segment
  const buildPath = (index: number) => {
    return [rootDir, ...segments.slice(0, index + 1)].join("/");
  };

  return (
    <nav className="flex items-center space-x-2 py-1 text-sm text-text-body">
      <Link
        to={rootDir}
        className="text-primary-500 hover:text-primary-700 hover:underline"
      >
        <span className="flex items-center space-x-1 text-text-sub">
          <HiHome className="w-5 h-5" />
        </span>
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const key = `${segment}-${index}`; // unique key to prevent duplicates
        return (
          <React.Fragment key={key}>
            <span className="">/</span>
            {isLast ? (
              <span className="text-base font-medium">{segment}</span>
            ) : (
              <Link
                to={buildPath(index)}
                className="text-primary-500 hover:text-primary-700 hover:underline"
              >
                {segment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
