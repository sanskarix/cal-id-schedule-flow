
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
  CalendarDays
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
  { id: "recent", title: "Recent Activity", enabled: false },
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
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light tracking-tight">Your total meetings</h1>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-extralight text-primary">47</span>
                <span className="text-sm text-muted-foreground font-light">this month</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 font-light border-border/40 hover:border-border hover:bg-accent/50"
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                Select Dates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWidgetSettings(!showWidgetSettings)}
                className="h-9 px-4 font-light border-border/40 hover:border-border hover:bg-accent/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWidgetSettings(!showWidgetSettings)}
                className="h-9 px-4 font-light hover:bg-accent/50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        {/* Widget Settings Panel */}
        {showWidgetSettings && (
          <Card className="mb-8 border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-light flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                Dashboard Widgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-4 rounded-lg border border-border/20 bg-card/30">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">New meetings</span>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extralight">12</span>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      15%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">compared to last week</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">Total hours</span>
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extralight">84</span>
                    <div className="flex items-center text-xs text-red-500">
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      4%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">compared to last week</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 hover:bg-card/60 transition-all duration-200">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-muted-foreground">Avg. meeting time</span>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extralight">42</span>
                    <span className="text-sm font-light text-muted-foreground">min</span>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      8%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">compared to last week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Meetings */}
          {widgets.find(w => w.id === "upcoming")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-light">Recent meetings</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary font-light">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-accent/30 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-4 flex-1">
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

          {/* Setup Progress */}
          {widgets.find(w => w.id === "setup")?.enabled && (
            <Card className="border-border/20 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-light flex items-center justify-between">
                  <span>Complete your setup</span>
                  <span className="text-sm font-light text-muted-foreground">{completedTasks}/{setupTasks.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-light text-muted-foreground">Progress</span>
                    <span className="text-sm font-light">{Math.round(setupProgress)}%</span>
                  </div>
                  <Progress value={setupProgress} className="h-2 bg-accent/30" />
                </div>

                <div className="space-y-3">
                  {setupTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/20 transition-colors">
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
