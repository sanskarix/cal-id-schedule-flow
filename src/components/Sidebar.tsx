import { 
  Home, 
  Calendar, 
  BookOpen, 
  Clock, 
  Users, 
  Grid3x3, 
  FileText, 
  Workflow, 
  BarChart3,
  Settings,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Event Types", path: "/event-types" },
  { icon: BookOpen, label: "Bookings", path: "/bookings" },
  { icon: Clock, label: "Availability", path: "/availability" },
  { icon: Users, label: "Teams", path: "/teams" },
  { icon: Grid3x3, label: "Apps", path: "/apps" },
  { icon: FileText, label: "Routing Forms", path: "/routing-forms" },
  { icon: Workflow, label: "Workflows", path: "/workflows" },
  { icon: BarChart3, label: "Insights", path: "/insights" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-r border-border/20 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border/10 flex items-center gap-3">
        <img 
          src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
          alt="Cal ID" 
          className="w-10 h-10"
        />
        <span className="text-foreground font-bold text-xl tracking-wide">Cal ID</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-hidden">
        <ul className="space-y-1">
          {sidebarItems.slice(0, 9).map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <a
                  href={item.path}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                    "group relative",
                    isActive && "bg-[#007ee5]/10 text-[#007ee5] border border-[#007ee5]/20"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border/10 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Moon className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Dark Mode</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Settings</span>
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-border/10">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent/30 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-[#007ee5] to-[#0066cc] rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
            JD
          </div>
          <div className="flex-1">
            <p className="text-foreground text-sm font-medium">John Doe</p>
            <p className="text-muted-foreground text-xs">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}