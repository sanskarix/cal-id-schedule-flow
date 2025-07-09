
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
      "bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className={cn(
          "flex items-center gap-3 transition-opacity duration-200",
          collapsed && "opacity-0"
        )}>
          <img 
            src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
            alt="Cal ID" 
            className="w-8 h-8"
          />
          <span className="text-white font-semibold text-lg">Cal ID</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <button className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "text-gray-300 hover:text-white hover:bg-gray-800",
                index === 0 && "bg-blue-600/20 text-blue-400 border border-blue-600/30"
              )}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn(
                  "transition-opacity duration-200",
                  collapsed && "opacity-0"
                )}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-gray-800 transition-opacity duration-200",
        collapsed && "opacity-0"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-gray-400 text-xs">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
