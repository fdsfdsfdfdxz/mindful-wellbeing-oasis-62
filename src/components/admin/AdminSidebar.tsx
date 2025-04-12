
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Settings,
  Package,
  FileText,
  Calendar,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: { title: string; path: string }[];
};

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/admin"
    },
    {
      title: "Practitioners",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/practitioners"
    },
    {
      title: "Clients",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/clients"
    },
    {
      title: "Services",
      icon: <Package className="h-5 w-5" />,
      path: "/admin/services",
      children: [
        { title: "All Services", path: "/admin/services" },
        { title: "Add Service", path: "/admin/services/add" },
        { title: "Categories", path: "/admin/services/categories" }
      ]
    },
    {
      title: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      path: "/admin/appointments"
    },
    {
      title: "Assessments",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/assessments"
    },
    {
      title: "Communications",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/admin/communications"
    },
    {
      title: "Content",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/content"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings"
    }
  ];

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/" className={cn("flex items-center", collapsed && "justify-center")}>
          {!collapsed && <h2 className="text-xl font-bold text-calmBlue-600">MindfulCare</h2>}
          {collapsed && <Shield className="h-8 w-8 text-calmBlue-600" />}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm rounded-md font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-calmBlue-50 text-calmBlue-600"
                        : "text-gray-700 hover:bg-gray-100",
                      collapsed && "justify-center"
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSubmenu === item.title && "transform rotate-90"
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && openSubmenu === item.title && (
                    <div className="pl-10 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "block px-4 py-2 text-sm rounded-md transition-colors",
                            isActive(child.path)
                              ? "bg-calmBlue-50 text-calmBlue-600"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-md font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-calmBlue-50 text-calmBlue-600"
                      : "text-gray-700 hover:bg-gray-100",
                    collapsed && "justify-center"
                  )}
                >
                  <span className={cn("flex-shrink-0", !collapsed && "mr-3")}>{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link to="/" className={cn(
          "flex items-center px-4 py-2 text-sm rounded-md font-medium text-gray-700 hover:bg-gray-100 transition-colors",
          collapsed && "justify-center"
        )}>
          <Home className={cn("flex-shrink-0", !collapsed && "mr-3")} />
          {!collapsed && <span>Back to Website</span>}
        </Link>
        <Button
          variant="ghost"
          className={cn(
            "w-full mt-2 flex items-center px-4 py-2 text-sm rounded-md font-medium text-red-600 hover:bg-red-50 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className={cn("flex-shrink-0", !collapsed && "mr-3")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
