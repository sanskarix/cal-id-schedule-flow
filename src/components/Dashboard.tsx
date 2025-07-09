
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
  EyeOff
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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-gray-400 mt-1">Here's what's happening with your calendar today.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWidgetSettings(!showWidgetSettings)}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Widget Settings Panel */}
        {showWidgetSettings && (
          <Card className="mb-6 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                Dashboard Widgets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      {widget.enabled ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-gray-500" />}
                      <span className="text-sm">{widget.title}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Today</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Week</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Growth</p>
                    <p className="text-2xl font-bold">+23%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Meetings */}
          {widgets.find(w => w.id === "upcoming")?.enabled && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Upcoming Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{meeting.time} • {meeting.date}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {meeting.type}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {meeting.attendees.length} attendee{meeting.attendees.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Setup Progress */}
          {widgets.find(w => w.id === "setup")?.enabled && (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-500" />
                    Complete Your Setup
                  </span>
                  <span className="text-sm text-gray-400">{completedTasks}/{setupTasks.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium">{Math.round(setupProgress)}%</span>
                  </div>
                  <Progress value={setupProgress} className="h-2" />
                </div>

                <div className="space-y-3">
                  {setupTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {task.completed ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <X className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.task}
                        </p>
                        <p className="text-xs text-gray-400">{task.description}</p>
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
