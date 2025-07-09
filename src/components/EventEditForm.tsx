import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Edit, ArrowLeft, Bold, Italic, Link2, ExternalLink, Copy, Calendar, Clock, Users, Grid3x3, Workflow, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EventEditForm({ eventId, initialData }) {
  const [activeTab, setActiveTab] = useState("setup");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialData?.title || "Product Demo",
    description: initialData?.description || "Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler",
    urlSlug: initialData?.urlSlug || "product-demo",
    duration: initialData?.duration || "30m",
    allowDurationSelect: false,
    location: "google-meet",
  });

  // Limits tab state
  const [limitBookingFrequency, setLimitBookingFrequency] = useState(false);
  const [limitTotalDuration, setLimitTotalDuration] = useState(false);
  const [limitFutureBookings, setLimitFutureBookings] = useState(false);
  const [offsetStartTimes, setOffsetStartTimes] = useState(false);

  const workingDays = [
    { day: "Monday", start: "9:00 am", end: "5:00 pm" },
    { day: "Tuesday", start: "9:00 am", end: "5:00 pm" },
    { day: "Wednesday", start: "9:00 am", end: "5:00 pm" },
    { day: "Thursday", start: "9:00 am", end: "5:00 pm" },
    { day: "Friday", start: "9:00 am", end: "5:00 pm" },
    { day: "Saturday", start: "9:00 am", end: "5:00 pm" },
    { day: "Sunday", start: "9:00 am", end: "5:00 pm" },
  ];

  const bookingQuestions = [
    { id: 1, question: "Your name", type: "Name", required: true, enabled: true },
    { id: 2, question: "Email Address", type: "Email", required: true, enabled: true },
    { id: 3, question: "Phone Number", type: "Phone", required: false, enabled: true },
    { id: 4, question: "What is this meeting about?", type: "Short Text", required: false, enabled: false },
    { id: 5, question: "Additional notes", type: "Long Text", required: false, enabled: true },
    { id: 6, question: "Add guests", type: "Multiple Emails", required: false, enabled: true },
    { id: 7, question: "Reason for reschedule", type: "Long Text", required: false, enabled: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/30 backdrop-blur">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-accent/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Edit Event Type</h1>
              <p className="text-sm text-muted-foreground">{formData.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 bg-card/50 border border-border/20">
            <TabsTrigger value="setup" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Calendar className="w-4 h-4 mr-1" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="availability" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Clock className="w-4 h-4 mr-1" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="limits" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Settings className="w-4 h-4 mr-1" />
              Limits
            </TabsTrigger>
            <TabsTrigger value="apps" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Grid3x3 className="w-4 h-4 mr-1" />
              Apps
            </TabsTrigger>
            <TabsTrigger value="workflows" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Workflow className="w-4 h-4 mr-1" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="recurring" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Calendar className="w-4 h-4 mr-1" />
              Recurring
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">
              <Settings className="w-4 h-4 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <div className="border rounded-md">
                    <div className="flex items-center gap-2 p-2 border-b bg-muted/30">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Link2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea 
                      id="description" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="border-0 focus-visible:ring-0"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch id="ai-translate" />
                    <Label htmlFor="ai-translate" className="text-sm">Translate description to the visitor's browser language using AI</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="url">URL</Label>
                  <div className="flex items-center">
                    <span className="bg-muted/50 px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground">
                      cal.id/sanskar/
                    </span>
                    <Input 
                      id="url" 
                      value={formData.urlSlug}
                      onChange={(e) => setFormData({...formData, urlSlug: e.target.value})}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Duration</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input value="30" className="w-20" />
                      <span className="text-sm text-muted-foreground">minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-8">
                    <Switch id="allow-duration-select" />
                    <Label htmlFor="allow-duration-select" className="text-sm">Allow booker to select duration</Label>
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Select defaultValue="google-meet">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-meet">Google Meet</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="link" className="p-0 h-auto text-sm mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    Add another location
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can't find the right conferencing app? Visit our{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      App Store <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Label>Schedule</Label>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Schedule
                  </Button>
                </div>
                <Select defaultValue="default-schedule">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default-schedule">Default Schedule</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Working Hours Display */}
                <div className="mt-6 space-y-2">
                  {workingDays.map((day) => (
                    <div key={day.day} className="flex items-center justify-between py-2 text-sm">
                      <span className="font-medium w-20">{day.day}</span>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{day.start}</span>
                        <span>-</span>
                        <span>{day.end}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-sm text-muted-foreground">
                    Asia/Calcutta
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Limits Tab */}
          <TabsContent value="limits" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label>Before event</Label>
                  <Select defaultValue="no-buffer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-buffer">No buffer time</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>After event</Label>
                  <Select defaultValue="no-buffer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-buffer">No buffer time</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Minimum Notice</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="0" className="w-20" />
                    <Select defaultValue="hours">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Time-slot intervals</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Use event length (default)</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="60min">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Limit booking frequency */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Limit booking frequency</Label>
                      <p className="text-sm text-muted-foreground">Limit how many times this event can be booked</p>
                    </div>
                    <Switch checked={limitBookingFrequency} onCheckedChange={setLimitBookingFrequency} />
                  </div>
                  {limitBookingFrequency && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1" className="w-20" />
                        <Select defaultValue="day">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Per day</SelectItem>
                            <SelectItem value="week">Per week</SelectItem>
                            <SelectItem value="month">Per month</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" className="bg-[#007ee5] hover:bg-[#0066cc]">Add Limit</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Only show first slot */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Only show the first slot of each day as available</Label>
                    <p className="text-sm text-muted-foreground">This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.</p>
                  </div>
                  <Switch />
                </div>

                {/* Limit total booking duration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Limit total booking duration</Label>
                      <p className="text-sm text-muted-foreground">Limit total amount of time that this event can be booked</p>
                    </div>
                    <Switch checked={limitTotalDuration} onCheckedChange={setLimitTotalDuration} />
                  </div>
                  {limitTotalDuration && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="60" className="w-20" />
                        <Select defaultValue="minutes">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="day">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Per day</SelectItem>
                            <SelectItem value="week">Per week</SelectItem>
                            <SelectItem value="month">Per month</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" className="bg-[#007ee5] hover:bg-[#0066cc]">Add Limit</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Limit future bookings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Limit future bookings</Label>
                      <p className="text-sm text-muted-foreground">Limit how far in the future this event can be booked</p>
                    </div>
                    <Switch checked={limitFutureBookings} onCheckedChange={setLimitFutureBookings} />
                  </div>
                  {limitFutureBookings && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20 space-y-4">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="30" className="w-20" />
                        <Select defaultValue="business-days">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business-days">business days</SelectItem>
                            <SelectItem value="calendar-days">calendar days</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">into the future</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Always 30 days available</div>
                      <div className="space-y-2">
                        <Label>Within a date range</Label>
                        <div className="flex items-center gap-2">
                          <Input type="date" defaultValue="2025-07-09" className="w-40" />
                          <span>-</span>
                          <Input type="date" defaultValue="2025-07-09" className="w-40" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Offset start times */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Offset start times</Label>
                      <p className="text-sm text-muted-foreground">Offset timeslots shown to bookers by a specified number of minutes</p>
                    </div>
                    <Switch checked={offsetStartTimes} onCheckedChange={setOffsetStartTimes} />
                  </div>
                  {offsetStartTimes && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Label>Offset by</Label>
                        <Input type="number" defaultValue="0" className="w-20" />
                        <span className="text-sm text-muted-foreground">Minutes</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">e.g. this will show time slots to your bookers at 9:00 AM instead of 9:00 AM</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Installed Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Grid3x3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No apps installed yet</p>
                  <Button className="bg-[#007ee5] hover:bg-[#0066cc]">Browse our app store</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Send confirmation email</p>
                        <p className="text-sm text-muted-foreground">Automatically send booking confirmation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Add to calendar</p>
                        <p className="text-sm text-muted-foreground">Create calendar event automatically</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recurring Tab */}
          <TabsContent value="recurring" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>Experimental:</strong> Recurring Events are currently experimental and causes some issues sometimes when checking for availability. We are working on fixing this.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Switch id="recurring-event" />
                    <Label htmlFor="recurring-event">Recurring Event</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">People can subscribe for recurring events</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label>Add to calendar</Label>
                  <Select defaultValue="default-calendar">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default-calendar">sanskarix@gmail.com (Google Calendar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">The calendar to add bookings to</p>
                </div>

                <div>
                  <Label>With event name</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch id="use-organizer-email" />
                    <Label htmlFor="use-organizer-email" className="text-sm">Use "Add to calendar" email as the organizer</Label>
                  </div>
                </div>

                <div>
                  <Label>Default</Label>
                  <Input defaultValue="sanskarix@gmail.com" />
                  <p className="text-sm text-muted-foreground mt-1">We'll display this email address as the organizer, and send confirmation emails here.</p>
                </div>

                <div>
                  <Label>Layout</Label>
                  <p className="text-sm text-muted-foreground mb-3">You can select multiple and your bookers can switch views.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>Month</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>Weekly</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label>Column</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Default view</Label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="column">Column</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">You can manage this for all your event types in Settings → Appearance or Override for this event only.</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Booking Questions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Customize the questions asked on the booking page</p>
                  <div className="space-y-3">
                    {bookingQuestions.map((question) => (
                      <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Switch checked={question.enabled} />
                          <div>
                            <p className="font-medium text-sm">{question.question}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={question.required ? "default" : "secondary"} className="text-xs">
                                {question.required ? "Required" : question.enabled ? "Optional" : "Hidden"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{question.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4 bg-[#007ee5] hover:bg-[#0066cc]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add a question
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Switch id="requires-confirmation" />
                    <div>
                      <Label htmlFor="requires-confirmation">Requires confirmation</Label>
                      <p className="text-sm text-muted-foreground">The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="enable-captcha" />
                    <div>
                      <Label htmlFor="enable-captcha">Enable captcha on Booking page</Label>
                      <p className="text-sm text-muted-foreground">By enabling captcha, you'll prevent automated bots from booking you.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="email-verification" />
                    <div>
                      <Label htmlFor="email-verification">Requires booker email verification</Label>
                      <p className="text-sm text-muted-foreground">To ensure booker's email verification before scheduling events</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="hide-notes" />
                    <div>
                      <Label htmlFor="hide-notes">Hide notes in calendar</Label>
                      <p className="text-sm text-muted-foreground">For privacy reasons, additional inputs and notes will be hidden in the calendar entry. They will still be sent to your email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="disable-cancel-reschedule" />
                    <div>
                      <Label htmlFor="disable-cancel-reschedule">Disable Cancel and Reschedule options for this event type</Label>
                      <p className="text-sm text-muted-foreground">Attendees will not be able to cancel or reschedule their bookings</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="hide-calendar-details" />
                    <div>
                      <Label htmlFor="hide-calendar-details">Hide calendar event details on shared calendars</Label>
                      <p className="text-sm text-muted-foreground">When a calendar is shared, events are visible to readers but their details are hidden from those without write access.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="redirect-booking" />
                    <div>
                      <Label htmlFor="redirect-booking">Redirect on booking</Label>
                      <p className="text-sm text-muted-foreground">Redirect to a custom URL after a successful booking</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="private-links" />
                    <div>
                      <Label htmlFor="private-links">Private Links</Label>
                      <p className="text-sm text-muted-foreground">Generate private URLs without exposing the username, which will be destroyed once used</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="offer-seats" />
                    <div>
                      <Label htmlFor="offer-seats">Offer seats</Label>
                      <p className="text-sm text-muted-foreground">Offer seats for booking. This automatically disables guest & opt-in bookings.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="lock-timezone" />
                    <div>
                      <Label htmlFor="lock-timezone">Lock timezone on booking page</Label>
                      <p className="text-sm text-muted-foreground">To lock the timezone on booking page, useful for in-person events.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Event type color</Label>
                  <p className="text-sm text-muted-foreground mb-2">This is only used for event type & booking differentiation within the app. It is not displayed to bookers.</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#007ee5] rounded border"></div>
                    <Input defaultValue="#007ee5" className="w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t mt-8">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button className="bg-[#007ee5] hover:bg-[#0066cc]">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}