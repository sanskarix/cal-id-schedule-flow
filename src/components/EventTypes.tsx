import { useState } from "react";
import { Plus, Search, Copy, MoreHorizontal, Settings, Users, User, Eye, Edit, Trash2, Calendar, Clock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const personalEventTypes = [{
  id: 1,
  title: "Product Demo",
  description: "Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)",
  duration: "30m",
  altDuration: "45m",
  isActive: true,
  bookingsToday: 3,
  color: "bg-blue-500"
}, {
  id: 2,
  title: "Interviews 🎯",
  description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
  duration: "30m",
  altDuration: "60m",
  isActive: true,
  bookingsToday: 1,
  color: "bg-red-500"
}];
const teams = [{
  id: "design-team",
  name: "Design Team",
  url: "cal.id/design-team",
  color: "bg-orange-500",
  eventTypes: [{
    id: 3,
    title: "Design Review",
    description: "Review design mockups and provide feedback",
    duration: "45m",
    altDuration: "60m",
    isActive: true,
    bookingsToday: 2,
    color: "bg-orange-500"
  }, {
    id: 4,
    title: "User Research Session",
    description: "Conduct user interviews and usability testing",
    duration: "60m",
    altDuration: "90m",
    isActive: false,
    bookingsToday: 0,
    color: "bg-purple-500"
  }]
}, {
  id: "engineering",
  name: "Engineering",
  url: "cal.id/engineering",
  color: "bg-blue-500",
  eventTypes: [{
    id: 5,
    title: "Technical Interview",
    description: "Technical assessment and coding session",
    duration: "90m",
    altDuration: "120m",
    isActive: true,
    bookingsToday: 1,
    color: "bg-blue-500"
  }]
}, {
  id: "marketing",
  name: "Marketing",
  url: "cal.id/marketing",
  color: "bg-red-500",
  eventTypes: [{
    id: 6,
    title: "Campaign Strategy",
    description: "Plan and discuss marketing campaigns",
    duration: "45m",
    altDuration: "60m",
    isActive: true,
    bookingsToday: 0,
    color: "bg-pink-500"
  }]
}, {
  id: "sales",
  name: "Sales",
  url: "cal.id/sales",
  color: "bg-green-500",
  eventTypes: [{
    id: 7,
    title: "Sales Demo",
    description: "Product demonstration for potential clients",
    duration: "30m",
    altDuration: "45m",
    isActive: true,
    bookingsToday: 2,
    color: "bg-green-500"
  }]
}];
export function EventTypes() {
  const [activeTab, setActiveTab] = useState("personal");
  const [searchQuery, setSearchQuery] = useState("");
  const getUserInfo = () => ({
    name: "Sanskar Yadav",
    username: "sanskar",
    avatar: "S"
  });
  const getStatsForPeriod = () => ({
    thisMonth: {
      value: 18,
      trend: "+12%"
    },
    thisWeek: {
      value: 7,
      trend: "+9%"
    },
    today: {
      value: 3,
      trend: "-2%"
    }
  });
  const user = getUserInfo();
  const stats = getStatsForPeriod();
  const getCurrentEventTypes = () => {
    if (activeTab === "personal") {
      return personalEventTypes;
    }
    const selectedTeam = teams.find(team => team.id === activeTab);
    return selectedTeam?.eventTypes || [];
  };
  const filteredEventTypes = getCurrentEventTypes().filter(eventType => eventType.title.toLowerCase().includes(searchQuery.toLowerCase()) || eventType.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Event Types</h1>
              <p className="text-sm text-muted-foreground font-light mt-1">
                Create events to share for people to book on your calendar.
              </p>
            </div>
            <div className="flex items-center gap-3">
              
              <Button size="sm" className="h-8 px-4 font-light bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-0 px-0 py-0">
        {/* User Profile Card */}
        

        {/* Teams Grid */}
        <div className="mb-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teams.map(team => {})}
          </div>
        </div>

        {/* Tabs and Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-card/50 border border-border/20">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal
              </TabsTrigger>
              {teams.map(team => <TabsTrigger key={team.id} value={team.id} className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {team.name}
                </TabsTrigger>)}
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search event types..." className="pl-10 w-64 h-8 border-border/40 bg-card/30" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredEventTypes.map(eventType => <Card key={eventType.id} className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-8 h-8 ${eventType.color} rounded-lg flex items-center justify-center text-white`}>
                          <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-lg">{eventType.title}</h3>
                            {eventType.bookingsToday > 0 && <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                {eventType.bookingsToday} today
                              </Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground font-light mb-3">
                            {eventType.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{eventType.duration}</span>
                              <span>•</span>
                              <span>{eventType.altDuration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={eventType.isActive} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}