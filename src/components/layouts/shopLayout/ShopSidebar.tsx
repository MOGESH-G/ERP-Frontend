import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { toggleSidebar } from "../../../slices/sidebarSlice";
import clsx from "clsx";
import { LuMenu } from "react-icons/lu";
import { MdMenuOpen, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { getMenuItems, routeToMenuMap } from "../../../lib/MenuItems";

const ShopSidebar = () => {
  const { shopId } = useParams();
  const menuItems = getMenuItems(shopId!);
  const location = useLocation();

  let timeoutId: ReturnType<typeof setTimeout>;

  const dispatch = useDispatch<AppDispatch>();
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed,
  );
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Dynamically resolve current path against routeToMenuMap
  const resolvedPath = Object.keys(routeToMenuMap).find((key) => {
    const pathPattern = key.replace(":shopId", shopId!);
    return location.pathname === pathPattern;
  });

  const activeMenuPath = resolvedPath ? routeToMenuMap[resolvedPath] : [];

  // Update open menus whenever location changes
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};
    activeMenuPath.forEach((label) => {
      newOpenMenus[label] = true;
    });
    setOpenMenus(newOpenMenus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev: Record<string, boolean>) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isMenuActive = (label: string) => activeMenuPath.includes(label);
  const isLeafActive = (label: string) =>
    activeMenuPath[activeMenuPath.length - 1] === label;

  const handleMouseEnter = (label: string) => {
    clearTimeout(timeoutId);
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setHoveredMenu(null);
    }, 150); // adjust delay
  };

  return (
    <aside
      className={clsx(
        "flex flex-col transition-all duration-300 bg-primary-500 text-white",
        isCollapsed ? "w-16" : "w-64",
      )}
      style={{ borderBottomRightRadius: "25px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-14">
        {!isCollapsed && (
          <div>
            <h1 className="font-bold text-lg">My ERP</h1>
            <p className="text-xs opacity-70">Company Name</p>
          </div>
        )}
        <span
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer"
        >
          {isCollapsed ? <LuMenu size={26} /> : <MdMenuOpen size={26} />}
        </span>
      </div>
      {/* Menu */}
      <nav className="relative flex-1 space-y-1 px-2">
        <div className="absolute -right-4 top-0 w-4 h-4 overflow-hidden bg-primary-500">
          <div
            className="absolute bottom-0 right-0 w-full h-full bg-bg-subtle"
            style={{
              borderTopLeftRadius: "100%",
            }}
          />
        </div>
        {menuItems.map((item) => {
          const hasChildren = !!item.children?.length;
          const activeParent = isMenuActive(item.label); // Highlight parent if child active

          // Leaf menu
          if (!hasChildren) {
            return (
              <NavLink
                key={item.label}
                to={item.path || ""}
                className={clsx(
                  "flex items-center gap-2 p-2 rounded hover:bg-primary-600 transition-colors duration-200",
                  isCollapsed && "justify-center",
                  isLeafActive(item.label) && "bg-primary-700",
                )}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          }

          // Menu with children
          return (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => isCollapsed && handleMouseEnter(item.label)}
              onMouseLeave={() => isCollapsed && handleMouseLeave()}
            >
              <div
                className={clsx(
                  "flex items-center justify-between p-2 rounded hover:bg-primary-600 cursor-pointer transition-colors duration-200",
                  isCollapsed && "justify-center",
                  activeParent && "bg-primary-700",
                )}
                onClick={() => !isCollapsed && toggleMenu(item.label)}
              >
                <div className="flex items-center gap-2">
                  <item.icon size={20} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && <MdKeyboardArrowDown />}
              </div>

              {/* Expanded submenu in expanded mode */}
              {!isCollapsed && openMenus[item.label] && (
                <div className="ml-6 flex flex-col space-y-1 mt-1 transition-all duration-200">
                  {item.children!.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path || ""}
                      className={clsx(
                        "flex items-center gap-2 p-1 rounded hover:bg-primary-600 transition-colors duration-200",
                        isLeafActive(sub.label) && "bg-primary-700",
                      )}
                    >
                      <sub.icon size={18} />
                      <span>{sub.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Floating submenu in collapsed mode with Tailwind animation */}
              {isCollapsed && hoveredMenu === item.label && (
                <div
                  className="absolute left-full ml-3 top-0 z-50 w-48 bg-primary-500 shadow-lg rounded p-2
                                opacity-0 animate-slide-fade-in"
                >
                  <div className="font-bold mb-2 border-b border-white/20 pb-1">
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-1">
                    {item.children!.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path || ""}
                        className={clsx(
                          "flex items-center gap-2 p-1 rounded hover:bg-primary-600 transition-colors duration-200",
                          isLeafActive(sub.label) && "bg-primary-700",
                        )}
                      >
                        <sub.icon size={18} />
                        <span>{sub.label}</span>
                      </NavLink>
                    ))}
                  </div>
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
