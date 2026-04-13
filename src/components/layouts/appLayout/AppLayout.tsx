import Breadcrumbs from "../../Breadcrumb";
import Header from "./AppHeader";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col px-6 bg-bg-subtle text-text-body overflow-auto">
        <Breadcrumbs rootDir="/app" />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
