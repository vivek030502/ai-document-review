import {
  LayoutDashboard,
  FileText,
  SearchCheck,
  ShieldAlert,
  ScanText,
  BarChart3,
  Settings,
  UserRound,
  LogOut,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    label: "Contract Review",
    path: "/contract-review/1",
    icon: SearchCheck,
  },
  {
    label: "Risk Analysis",
    path: "/risk-analysis",
    icon: ShieldAlert,
  },
  {
    label: "Clause Extraction",
    path: "/clause-extraction",
    icon: ScanText,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "My Profile",
    path: "/profile",
    icon: UserRound,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="brand">

        <div className="brand-logo">
          L
        </div>

        <div>
          <div className="brand-name">
            LexAI
          </div>

          <div className="brand-subtitle">
            Legal Intelligence Platform
          </div>
        </div>

      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />

              <span>
                {item.label}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* AI Status */}
      <div className="sidebar-footer">

        <div className="ai-status">

          <span className="status-dot"></span>

          <div>
            <div className="status-title">
              AI Processing
            </div>

            <div className="status-subtitle">
              All systems operational
            </div>
          </div>

        </div>

        <Link className="sidebar-logout" to="/logout">
          <LogOut size={15} />
          Sign out
        </Link>

      </div>

    </aside>
  );
}