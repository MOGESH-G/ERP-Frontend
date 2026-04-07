import { useState } from "react";
import clsx from "clsx";
import { LuMenu } from "react-icons/lu";
import { MdMenuOpen, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import menuItems from "../../lib/MenuItems";

const ShopSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={clsx(
        "relative flex flex-col transition-all duration-300",
        "bg-primary-500 text-white",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ borderBottomRightRadius: "20px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div>
            <h1 className="font-bold text-lg">My ERP</h1>
            <p className="text-xs opacity-70">Company Name</p>
          </div>
        )}

        <span onClick={() => setCollapsed((c) => !c)} className="cursor-pointer">
          {collapsed ? <LuMenu size={26} /> : <MdMenuOpen size={26} />}
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-1 px-2">
        {menuItems.map((item) => {
          const isOpen = openMenus[item.label];

          return (
            <div key={item.label}>
              {/* Parent Item */}
              <div
                onClick={() => item.children && toggleMenu(item.label)}
                className={clsx(
                  "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10",
                )}
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.children && (
                  <MdKeyboardArrowDown
                    className={clsx(
                      "transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                )}
              </div>

              {/* Submenu */}
              {!collapsed && item.children && isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        clsx(
                          "block px-3 py-2 text-sm rounded-md hover:bg-white/10",
                          isActive && "bg-white/20"
                        )
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default ShopSidebar;