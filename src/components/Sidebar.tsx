
import { useState } from "react";
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-r border-border/20 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-border/10 flex items-center justify-between">
        <div className={cn(
          "flex items-center gap-3 transition-opacity duration-200",
          collapsed && "opacity-0"
        )}>
          <img 
            src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
            alt="Cal ID" 
            className="w-8 h-8"
          />
          <span className="text-foreground font-light text-lg tracking-wide">Cal ID</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground hover:bg-accent/50 h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <button className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                "group relative",
                index === 0 && "bg-accent/30 text-foreground border border-border/20"
              )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn(
                  "font-light transition-opacity duration-200",
                  collapsed && "opacity-0"
                )}>
                  {item.label}
                </span>
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-border/40">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-border/10 transition-opacity duration-200",
        collapsed && "opacity-0"
      )}>
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/30 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
            JD
          </div>
          <div className="flex-1">
            <p className="text-foreground text-sm font-light">John Doe</p>
            <p className="text-muted-foreground text-xs font-light">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
