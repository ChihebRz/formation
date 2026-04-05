import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  Layers,
  Building2,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/formations", icon: GraduationCap, label: "Formations" },
  { to: "/formateurs", icon: UserCheck, label: "Formateurs" },
  { to: "/participants", icon: Users, label: "Participants" },
  { to: "/domaines", icon: Layers, label: "Domaines" },
  { to: "/structures", icon: Building2, label: "Structures" },
  { to: "/profils", icon: Briefcase, label: "Profils" },
  { to: "/utilisateurs", icon: Settings, label: "Utilisateurs" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <aside
      className={`gradient-sidebar flex flex-col h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-slide-in">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground tracking-tight">
              Excellent Training
            </h1>
            <p className="text-[10px] text-sidebar-muted">Green Building</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-sidebar-primary" : "text-sidebar-muted group-hover:text-sidebar-accent-foreground"
                }`}
              />
              {!collapsed && <span className="animate-slide-in">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <div className="px-3 py-2 text-xs text-sidebar-muted truncate">
          {!collapsed && <span className="animate-slide-in">{user?.login}</span>}
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 gap-3"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Déconnexion"}
        </Button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors rounded-lg hover:bg-sidebar-accent/50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;

