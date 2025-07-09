import { useState } from "react";
import { Plus, Search, Copy, MoreHorizontal, User, Users, Clock, Eye, Edit, Trash2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreateEventDialog } from "./CreateEventDialog";
import { useNavigate } from "react-router-dom";

const personalEventTypes = [
  {
    id: 1,
    title: "Product Demo",
    description: "Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)",
    duration: "30m",
    altDuration: "45m",
    isActive: true,
    bookingsToday: 3,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Interviews 🎯",
    description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    duration: "30m",
    altDuration: "60m",
    isActive: true,
    bookingsToday: 1,
    color: "bg-red-500"
  },
  {
    id: 3,
    title: "Coffee Chat ☕",
    description: "Casual 15-minute conversation over virtual coffee",
    duration: "15m",
    altDuration: "30m",
    isActive: true,
    bookingsToday: 2,
    color: "bg-amber-500"
  },
  {
    id: 4,
    title: "Quick Sync",
    description: "Brief alignment meeting for project updates",
    duration: "15m",
    altDuration: "30m",
    isActive: true,
    bookingsToday: 5,
    color: "bg-green-500"
  },
  {
    id: 5,
    title: "Strategy Session",
    description: "Deep dive into strategic planning and decision making",
    duration: "60m",
    altDuration: "90m",
    isActive: false,
    bookingsToday: 0,
    color: "bg-purple-500"
  },
  {
    id: 6,
    title: "Client Onboarding",
    description: "Welcome new clients and guide them through our process",
    duration: "45m",
    altDuration: "60m",
    isActive: true,
    bookingsToday: 1,
    color: "bg-indigo-500"
  },
  {
    id: 7,
    title: "Feedback Session",
    description: "Collect valuable feedback and improvement suggestions",
    duration: "30m",
    altDuration: "45m",
    isActive: true,
    bookingsToday: 0,
    color: "bg-pink-500"
  },
  {
    id: 8,
    title: "Team Standup",
    description: "Daily team synchronization and progress updates",
    duration: "15m",
    altDuration: "30m",
    isActive: true,
    bookingsToday: 1,
    color: "bg-cyan-500"
  },
  {
    id: 9,
    title: "Project Review",
    description: "Comprehensive review of project deliverables and milestones",
    duration: "45m",
    altDuration: "60m",
    isActive: false,
    bookingsToday: 0,
    color: "bg-orange-500"
  },
  {
    id: 10,
    title: "Training Session",
    description: "Skill development and knowledge transfer meeting",
    duration: "60m",
    altDuration: "90m",
    isActive: true,
    bookingsToday: 0,
    color: "bg-teal-500"
  }
];

const teams = [
  {
    id: "design-team",
    name: "Design Team",
    url: "cal.id/design-team",
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    icon: "🎨",
    eventTypes: [
      {
        id: 11, title: "Design Review", description: "Review design mockups and provide feedback", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 2, color: "bg-orange-500"
      },
      {
        id: 12, title: "User Research Session", description: "Conduct user interviews and usability testing", duration: "60m", altDuration: "90m", isActive: false, bookingsToday: 0, color: "bg-purple-500"
      },
      {
        id: 13, title: "Design Sprint Planning", description: "Plan and kick-off design sprint activities", duration: "90m", altDuration: "120m", isActive: true, bookingsToday: 1, color: "bg-pink-500"
      },
      {
        id: 14, title: "Prototype Testing", description: "Test interactive prototypes with stakeholders", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 3, color: "bg-indigo-500"
      },
      {
        id: 15, title: "Design System Review", description: "Review and update design system components", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 0, color: "bg-violet-500"
      },
      {
        id: 16, title: "Creative Brainstorm", description: "Collaborative ideation and creative exploration", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 1, color: "bg-rose-500"
      },
      {
        id: 17, title: "Design Critique", description: "Peer review and constructive feedback session", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-amber-500"
      },
      {
        id: 18, title: "Accessibility Audit", description: "Review designs for accessibility compliance", duration: "45m", altDuration: "60m", isActive: false, bookingsToday: 0, color: "bg-emerald-500"
      },
      {
        id: 19, title: "Brand Guidelines", description: "Discuss and refine brand identity guidelines", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 0, color: "bg-blue-500"
      },
      {
        id: 20, title: "Design Handoff", description: "Transfer designs to development team", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 1, color: "bg-cyan-500"
      }
    ]
  },
  {
    id: "engineering",
    name: "Engineering",
    url: "cal.id/engineering",
    color: "bg-gradient-to-br from-blue-400 to-indigo-600",
    icon: "⚡",
    eventTypes: [
      {
        id: 21, title: "Technical Interview", description: "Technical assessment and coding session", duration: "90m", altDuration: "120m", isActive: true, bookingsToday: 1, color: "bg-blue-500"
      },
      {
        id: 22, title: "Code Review", description: "Peer code review and quality assessment", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 4, color: "bg-indigo-500"
      },
      {
        id: 23, title: "Architecture Discussion", description: "System design and architecture planning", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 1, color: "bg-purple-500"
      },
      {
        id: 24, title: "Bug Triage", description: "Review and prioritize reported issues", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-red-500"
      },
      {
        id: 25, title: "Sprint Planning", description: "Plan upcoming development sprint", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 0, color: "bg-green-500"
      },
      {
        id: 26, title: "Tech Talk", description: "Knowledge sharing and technical presentation", duration: "45m", altDuration: "60m", isActive: false, bookingsToday: 0, color: "bg-orange-500"
      },
      {
        id: 27, title: "Pair Programming", description: "Collaborative coding session", duration: "60m", altDuration: "120m", isActive: true, bookingsToday: 1, color: "bg-teal-500"
      },
      {
        id: 28, title: "System Demo", description: "Demonstrate new features and functionality", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-cyan-500"
      },
      {
        id: 29, title: "Performance Review", description: "Analyze system performance and optimization", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 0, color: "bg-yellow-500"
      },
      {
        id: 30, title: "DevOps Sync", description: "Infrastructure and deployment discussion", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 1, color: "bg-gray-500"
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    url: "cal.id/marketing",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    icon: "📈",
    eventTypes: [
      {
        id: 31, title: "Campaign Strategy", description: "Plan and discuss marketing campaigns", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 0, color: "bg-pink-500"
      },
      {
        id: 32, title: "Content Review", description: "Review and approve marketing content", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 3, color: "bg-purple-500"
      },
      {
        id: 33, title: "Brand Workshop", description: "Collaborative brand development session", duration: "90m", altDuration: "120m", isActive: true, bookingsToday: 1, color: "bg-indigo-500"
      },
      {
        id: 34, title: "Analytics Review", description: "Analyze marketing performance metrics", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 1, color: "bg-blue-500"
      },
      {
        id: 35, title: "Social Media Planning", description: "Plan social media content and strategy", duration: "30m", altDuration: "45m", isActive: false, bookingsToday: 0, color: "bg-cyan-500"
      },
      {
        id: 36, title: "Event Planning", description: "Plan marketing events and activations", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 0, color: "bg-orange-500"
      },
      {
        id: 37, title: "Influencer Outreach", description: "Discuss influencer partnerships and collaborations", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-rose-500"
      },
      {
        id: 38, title: "SEO Strategy", description: "Search engine optimization planning", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 1, color: "bg-green-500"
      },
      {
        id: 39, title: "PR Planning", description: "Public relations and media strategy", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 0, color: "bg-violet-500"
      },
      {
        id: 40, title: "Customer Journey", description: "Map and optimize customer experience", duration: "90m", altDuration: "120m", isActive: false, bookingsToday: 0, color: "bg-amber-500"
      }
    ]
  },
  {
    id: "sales",
    name: "Sales",
    url: "cal.id/sales",
    color: "bg-gradient-to-br from-green-400 to-emerald-500",
    icon: "💼",
    eventTypes: [
      {
        id: 41, title: "Sales Demo", description: "Product demonstration for potential clients", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-green-500"
      },
      {
        id: 42, title: "Discovery Call", description: "Understand client needs and requirements", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 3, color: "bg-emerald-500"
      },
      {
        id: 43, title: "Proposal Review", description: "Review and discuss project proposals", duration: "60m", altDuration: "90m", isActive: true, bookingsToday: 1, color: "bg-teal-500"
      },
      {
        id: 44, title: "Contract Negotiation", description: "Negotiate terms and finalize agreements", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 1, color: "bg-blue-500"
      },
      {
        id: 45, title: "Sales Training", description: "Team training and skill development", duration: "90m", altDuration: "120m", isActive: false, bookingsToday: 0, color: "bg-indigo-500"
      },
      {
        id: 46, title: "Pipeline Review", description: "Review sales pipeline and opportunities", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 2, color: "bg-purple-500"
      },
      {
        id: 47, title: "Client Check-in", description: "Regular client relationship maintenance", duration: "15m", altDuration: "30m", isActive: true, bookingsToday: 4, color: "bg-cyan-500"
      },
      {
        id: 48, title: "Competitive Analysis", description: "Analyze market competition and positioning", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 0, color: "bg-orange-500"
      },
      {
        id: 49, title: "ROI Presentation", description: "Present return on investment analysis", duration: "30m", altDuration: "45m", isActive: true, bookingsToday: 1, color: "bg-red-500"
      },
      {
        id: 50, title: "Renewal Discussion", description: "Discuss contract renewals and expansions", duration: "45m", altDuration: "60m", isActive: true, bookingsToday: 1, color: "bg-pink-500"
      }
    ]
  }
];

export function EventTypes() {
  const [activeTab, setActiveTab] = useState("personal");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getCurrentTabData = () => {
    if (activeTab === "personal") {
      return { name: "Sanskar Yadav", username: "sanskar", avatar: "S", url: "cal.id/sanskar", eventTypes: personalEventTypes };
    }
    const selectedTeam = teams.find(team => team.id === activeTab);
    return selectedTeam ? { 
      name: selectedTeam.name, 
      username: selectedTeam.id, 
      avatar: selectedTeam.icon, 
      url: selectedTeam.url, 
      eventTypes: selectedTeam.eventTypes 
    } : { name: "Sanskar Yadav", username: "sanskar", avatar: "S", url: "cal.id/sanskar", eventTypes: personalEventTypes };
  };

  const currentData = getCurrentTabData();
  const filteredEventTypes = currentData.eventTypes.filter(eventType => 
    eventType.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    eventType.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditEvent = (eventType) => {
    navigate(`/event-types/edit/${eventType.id}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section with Profile/Team Info */}
      <div className="border-b border-border/20 bg-card/30 backdrop-blur">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007ee5] to-[#0066cc] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {currentData.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">{currentData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground text-sm">{currentData.url}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-accent/50"
                    onClick={() => copyToClipboard(currentData.url)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{currentData.eventTypes.length} event types</p>
              </div>
            </div>
            <Button 
              className="bg-[#007ee5] hover:bg-[#0066cc] text-white font-medium transition-all duration-200 hover:scale-105"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Tabs and Search */}
        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="bg-card/50 border border-border/20 p-1">
              <TabsTrigger 
                value="personal" 
                className="flex items-center gap-2 data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] data-[state=active]:border-[#007ee5]/20 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Personal
              </TabsTrigger>
              {teams.map(team => (
                <TabsTrigger 
                  key={team.id} 
                  value={team.id} 
                  className="flex items-center gap-2 data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] data-[state=active]:border-[#007ee5]/20 transition-all duration-200"
                >
                  <Users className="w-4 h-4" />
                  {team.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3 ml-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search event types..."
                className="pl-10 w-64 h-9 border-border/40 bg-card/30 focus:border-[#007ee5]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Team URL Display */}
        {activeTab !== "personal" && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-md text-sm text-muted-foreground">
              <span>{currentData.url}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => copyToClipboard(currentData.url)}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Event Types Grid */}
        <div className="space-y-3">
          {filteredEventTypes.map(eventType => (
            <Card 
              key={eventType.id} 
              className="border-border/20 bg-card/50 backdrop-blur hover:bg-card/70 transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
              onClick={() => handleEditEvent(eventType)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 ${eventType.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg group-hover:text-[#007ee5] transition-colors">
                          {eventType.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {eventType.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-muted/50 rounded text-xs">{eventType.duration}</span>
                            <span className="px-2 py-1 bg-muted/50 rounded text-xs">{eventType.altDuration}</span>
                          </div>
                        </div>
                        {eventType.bookingsToday > 0 && (
                          <span className="text-muted-foreground text-xs">
                            {eventType.bookingsToday} bookings today
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={eventType.isActive} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditEvent(eventType)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Event Dialog */}
        <CreateEventDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          currentTab={activeTab}
          teams={teams}
        />
      </div>
    </div>
  );
}
