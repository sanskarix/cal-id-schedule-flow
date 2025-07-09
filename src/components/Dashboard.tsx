
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  Settings,
  Check,
  X,
  ChevronRight,
  Grid3x3,
  Eye,
  EyeOff,
  Filter,
  CalendarDays,
  Bell,
  Star,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const upcomingMeetings = [
  {
    title: "Product Strategy Meeting",
    time: "2:00 PM - 3:00 PM",
    date: "Today",
    attendees: ["Alice Johnson", "Bob Smith"],
    type: "Team Meeting"
  },
  {
    title: "Client Consultation",
    time: "4:30 PM - 5:30 PM", 
    date: "Today",
    attendees: ["Sarah Wilson"],
    type: "Consultation"
  },
  {
    title: "Weekly Standup",
    time: "9:00 AM - 9:30 AM",
    date: "Tomorrow",
    attendees: ["Team Dev"],
    type: "Standup"
  }
];

const notifications = [
  {
    type: "reschedule",
    title: "Product Demo rescheduled",
    description: "Sarah Wilson moved the meeting to 3:00 PM",
    time: "2 hours ago",
    icon: RefreshCw
  },
  {
    type: "cancel",
    title: "Team Sync cancelled",
    description: "Meeting cancelled by John Doe",
    time: "4 hours ago",
    icon: X
  },
  {
    type: "update",
    title: "Client Review updated",
    description: "Location changed to Conference Room B",
    time: "1 day ago",
    icon: AlertCircle
  }
];

const setupTasks = [
  { task: "Set Availability", completed: true, description: "Configure your working hours" },
  { task: "Sync Calendars", completed: true, description: "Connect Google, Outlook calendars" },
  { task: "Integrate Apps", completed: false, description: "Add Zoom, Teams integrations" },
  { task: "Add Branding", completed: false, description: "Customize your booking page" },
  { task: "Automate Workflows", completed: false, description: "Set up email reminders" },
];

const dashboardWidgets = [
  { id: "upcoming", title: "Upcoming Meetings", enabled: true },
  { id: "stats", title: "Meeting Statistics", enabled: true },
  { id: "setup", title: "Complete Setup", enabled: true },
  { id: "notifications", title: "Notifications", enabled: true },
  { id: "popular", title: "Most Booked Meeting Type", enabled: true },
];

export function Dashboard() {
  const [widgets, setWidgets] = useState(dashboardWidgets);
  const [showWidgetSettings, setShowWidgetSettings] = useState(false);

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const completedTasks = setupTasks.filter(t => t.completed).length;
  const setupProgress = (completedTasks / setupTasks.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight">Your total meetings</h1>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-extralight text-primary">47</span>
                <span className="text-sm text-muted-foreground font-light">this month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 font-light border-border/40 hover:border-border hover:bg-accent/50"
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                Select Dates
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 font-light border-border/40 hover:border-border hover:bg-accent/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWidgetSettings(!showWidgetSettings)}
                className="h-8 px-3 font-light hover:bg-accent/50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Widget Settings Panel */}
        {showWidgetSettings && (
          <Card className="mb-6 border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-light flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                Dashboard Widgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-card/30">
                    <div className="flex items-center gap-3">
                      {widget.enabled ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                      <span className="text-sm font-light">{widget.title}</span>
                    </div>
                    <Switch
                      checked={widget.enabled}
                      onCheckedChange={() => toggleWidget(widget.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        {widgets.find(w => w.id === "stats")?.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">New meetings</span>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extralight">12</span>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      15%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">vs last week</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">Total hours</span>
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extralight">84</span>
                    <div className="flex items-center text-xs text-red-500">
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      4%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">vs last week</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">Avg. meeting time</span>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extralight">42</span>
                    <span className="text-sm font-light text-muted-foreground">min</span>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      8%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">vs last week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Meetings */}
          {widgets.find(w => w.id === "upcoming")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-light">Recent meetings</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary font-light h-8">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-accent/30 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-primary rounded-full opacity-80"></div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-normal text-sm">{meeting.title}</h4>
                            <span className="text-xs text-muted-foreground font-light">{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs font-light bg-accent/50 text-muted-foreground">
                              {meeting.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-light">
                              {meeting.attendees.length} attendee{meeting.attendees.length > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {widgets.find(w => w.id === "notifications")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-light flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary font-light h-8">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {notifications.map((notification, index) => (
                    <div key={index} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-accent/30 transition-all duration-200 cursor-pointer">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'reschedule' ? 'bg-blue-500/10 text-blue-500' :
                        notification.type === 'cancel' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        <notification.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-normal text-sm">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground font-light">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-light">{notification.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Most Booked Meeting Type */}
          {widgets.find(w => w.id === "popular")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-light flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Most Booked Meeting Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-primary">Product Demo</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/20">24 bookings</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-light mb-3">30 min • Showcase our latest features</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>This month: 24</span>
                      <span>•</span>
                      <span>Conversion: 85%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border/20 bg-card/30">
                      <div className="text-sm font-light text-muted-foreground">Client Consultation</div>
                      <div className="text-lg font-light">18</div>
                    </div>
                    <div className="p-3 rounded-lg border border-border/20 bg-card/30">
                      <div className="text-sm font-light text-muted-foreground">Team Sync</div>
                      <div className="text-lg font-light">12</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Setup Progress */}
          {widgets.find(w => w.id === "setup")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-light flex items-center justify-between">
                  <span>Complete your setup</span>
                  <span className="text-sm font-light text-muted-foreground">{completedTasks}/{setupTasks.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light text-muted-foreground">Progress</span>
                    <span className="text-sm font-light">{Math.round(setupProgress)}%</span>
                  </div>
                  <Progress value={setupProgress} className="h-2 bg-accent/30" />
                </div>

                <div className="space-y-2">
                  {setupTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/20 transition-colors">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        task.completed ? 'bg-primary' : 'bg-accent/50 border-2 border-border/40'
                      }`}>
                        {task.completed && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-light ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.task}
                        </p>
                        <p className="text-xs text-muted-foreground font-light">{task.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
