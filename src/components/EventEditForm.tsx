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
    <div className="min-h-screen bg-background ml-64">
      {/* Sticky Header with glass effect and grain */}
      <div className="sticky top-0 z-30 border-b border-border/20 bg-card/30 backdrop-blur-md supports-[backdrop-filter]:bg-card/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}></div>
        <div className="relative px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-accent/50 font-light"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-extralight tracking-tight">Edit Event Type</h1>
              <p className="text-sm text-muted-foreground font-light">{formData.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 bg-card/50 border border-border/20">
            <TabsTrigger value="setup" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Calendar className="w-4 h-4 mr-1" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="availability" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Clock className="w-4 h-4 mr-1" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="limits" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Settings className="w-4 h-4 mr-1" />
              Limits
            </TabsTrigger>
            <TabsTrigger value="apps" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Grid3x3 className="w-4 h-4 mr-1" />
              Apps
            </TabsTrigger>
            <TabsTrigger value="workflows" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Workflow className="w-4 h-4 mr-1" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="recurring" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Calendar className="w-4 h-4 mr-1" />
              Recurring
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5] font-light">
              <Settings className="w-4 h-4 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="title" className="font-light">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="font-light"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="font-light">Description</Label>
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
                      className="border-0 focus-visible:ring-0 font-light"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch id="ai-translate" />
                    <Label htmlFor="ai-translate" className="text-sm font-light">Translate description to the visitor's browser language using AI</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="url" className="font-light">URL</Label>
                  <div className="flex items-center">
                    <span className="bg-muted/50 px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground font-light">
                      cal.id/sanskar/
                    </span>
                    <Input 
                      id="url" 
                      value={formData.urlSlug}
                      onChange={(e) => setFormData({...formData, urlSlug: e.target.value})}
                      className="rounded-l-none font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="font-light">Duration</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input value="30" className="w-20 font-light" />
                      <span className="text-sm text-muted-foreground font-light">minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-8">
                    <Switch id="allow-duration-select" />
                    <Label htmlFor="allow-duration-select" className="text-sm font-light">Allow booker to select duration</Label>
                  </div>
                </div>

                <div>
                  <Label className="font-light">Location</Label>
                  <Select defaultValue="google-meet">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-meet" className="font-light">Google Meet</SelectItem>
                      <SelectItem value="zoom" className="font-light">Zoom</SelectItem>
                      <SelectItem value="teams" className="font-light">Microsoft Teams</SelectItem>
                      <SelectItem value="phone" className="font-light">Phone</SelectItem>
                      <SelectItem value="in-person" className="font-light">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="link" className="p-0 h-auto text-sm mt-2 font-light">
                    <Plus className="w-4 h-4 mr-1" />
                    Add another location
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 font-light">
                    Can't find the right conferencing app? Visit our{" "}
                    <Button variant="link" className="p-0 h-auto text-sm font-light">
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
                  <Label className="font-light">Schedule</Label>
                  <Button variant="outline" size="sm" className="font-light">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Schedule
                  </Button>
                </div>
                <Select defaultValue="default-schedule">
                  <SelectTrigger className="font-light">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default-schedule" className="font-light">Default Schedule</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Working Hours Display */}
                <div className="mt-6 space-y-2">
                  {workingDays.map((day) => (
                    <div key={day.day} className="flex items-center justify-between py-2 text-sm">
                      <span className="font-light w-20">{day.day}</span>
                      <div className="flex items-center gap-2 text-muted-foreground font-light">
                        <span>{day.start}</span>
                        <span>-</span>
                        <span>{day.end}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-sm text-muted-foreground font-light">
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
                  <Label className="font-light">Before event</Label>
                  <Select defaultValue="no-buffer">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-buffer" className="font-light">No buffer time</SelectItem>
                      <SelectItem value="5min" className="font-light">5 minutes</SelectItem>
                      <SelectItem value="15min" className="font-light">15 minutes</SelectItem>
                      <SelectItem value="30min" className="font-light">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-light">After event</Label>
                  <Select defaultValue="no-buffer">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-buffer" className="font-light">No buffer time</SelectItem>
                      <SelectItem value="5min" className="font-light">5 minutes</SelectItem>
                      <SelectItem value="15min" className="font-light">15 minutes</SelectItem>
                      <SelectItem value="30min" className="font-light">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-light">Minimum Notice</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="0" className="w-20 font-light" />
                    <Select defaultValue="hours">
                      <SelectTrigger className="w-24 font-light">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours" className="font-light">Hours</SelectItem>
                        <SelectItem value="days" className="font-light">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="font-light">Time-slot intervals</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default" className="font-light">Use event length (default)</SelectItem>
                      <SelectItem value="15min" className="font-light">15 minutes</SelectItem>
                      <SelectItem value="30min" className="font-light">30 minutes</SelectItem>
                      <SelectItem value="60min" className="font-light">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Limit booking frequency */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-light">Limit booking frequency</Label>
                      <p className="text-sm text-muted-foreground font-light">Limit how many times this event can be booked</p>
                    </div>
                    <Switch checked={limitBookingFrequency} onCheckedChange={setLimitBookingFrequency} />
                  </div>
                  {limitBookingFrequency && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1" className="w-20 font-light" />
                        <Select defaultValue="day">
                          <SelectTrigger className="w-32 font-light">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day" className="font-light">Per day</SelectItem>
                            <SelectItem value="week" className="font-light">Per week</SelectItem>
                            <SelectItem value="month" className="font-light">Per month</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" className="bg-[#007ee5] hover:bg-[#0066cc] font-light">Add Limit</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Only show first slot */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-light">Only show the first slot of each day as available</Label>
                    <p className="text-sm text-muted-foreground font-light">This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.</p>
                  </div>
                  <Switch />
                </div>

                {/* Limit total booking duration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-light">Limit total booking duration</Label>
                      <p className="text-sm text-muted-foreground font-light">Limit total amount of time that this event can be booked</p>
                    </div>
                    <Switch checked={limitTotalDuration} onCheckedChange={setLimitTotalDuration} />
                  </div>
                  {limitTotalDuration && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="60" className="w-20 font-light" />
                        <Select defaultValue="minutes">
                          <SelectTrigger className="w-32 font-light">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes" className="font-light">Minutes</SelectItem>
                            <SelectItem value="hours" className="font-light">Hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="day">
                          <SelectTrigger className="w-32 font-light">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day" className="font-light">Per day</SelectItem>
                            <SelectItem value="week" className="font-light">Per week</SelectItem>
                            <SelectItem value="month" className="font-light">Per month</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" className="bg-[#007ee5] hover:bg-[#0066cc] font-light">Add Limit</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Limit future bookings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-light">Limit future bookings</Label>
                      <p className="text-sm text-muted-foreground font-light">Limit how far in the future this event can be booked</p>
                    </div>
                    <Switch checked={limitFutureBookings} onCheckedChange={setLimitFutureBookings} />
                  </div>
                  {limitFutureBookings && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20 space-y-4">
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="30" className="w-20 font-light" />
                        <Select defaultValue="business-days">
                          <SelectTrigger className="w-40 font-light">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business-days" className="font-light">business days</SelectItem>
                            <SelectItem value="calendar-days" className="font-light">calendar days</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground font-light">into the future</span>
                      </div>
                      <div className="text-sm text-muted-foreground font-light">Always 30 days available</div>
                      <div className="space-y-2">
                        <Label className="font-light">Within a date range</Label>
                        <div className="flex items-center gap-2">
                          <Input type="date" defaultValue="2025-07-09" className="w-40 font-light" />
                          <span className="font-light">-</span>
                          <Input type="date" defaultValue="2025-07-09" className="w-40 font-light" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Offset start times */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-light">Offset start times</Label>
                      <p className="text-sm text-muted-foreground font-light">Offset timeslots shown to bookers by a specified number of minutes</p>
                    </div>
                    <Switch checked={offsetStartTimes} onCheckedChange={setOffsetStartTimes} />
                  </div>
                  {offsetStartTimes && (
                    <div className="ml-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2">
                        <Label className="font-light">Offset by</Label>
                        <Input type="number" defaultValue="0" className="w-20 font-light" />
                        <span className="text-sm text-muted-foreground font-light">Minutes</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 font-light">e.g. this will show time slots to your bookers at 9:00 AM instead of 9:00 AM</p>
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
                <CardTitle className="text-lg font-light">Installed Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Grid3x3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4 font-light">No apps installed yet</p>
                  <Button className="bg-[#007ee5] hover:bg-[#0066cc] font-light">Browse our app store</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-light">Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-light">Send confirmation email</p>
                        <p className="text-sm text-muted-foreground font-light">Automatically send booking confirmation</p>
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
                        <p className="font-light">Add to calendar</p>
                        <p className="text-sm text-muted-foreground font-light">Create calendar event automatically</p>
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
                  <p className="text-sm text-amber-800 font-light">
                    <strong>Experimental:</strong> Recurring Events are currently experimental and causes some issues sometimes when checking for availability. We are working on fixing this.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Switch id="recurring-event" />
                    <Label htmlFor="recurring-event" className="font-light">Recurring Event</Label>
                  </div>
                  <p className="text-sm text-muted-foreground font-light">People can subscribe for recurring events</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="font-light">Add to calendar</Label>
                  <Select defaultValue="default-calendar">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default-calendar" className="font-light">sanskarix@gmail.com (Google Calendar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1 font-light">The calendar to add bookings to</p>
                </div>

                <div>
                  <Label className="font-light">With event name</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch id="use-organizer-email" />
                    <Label htmlFor="use-organizer-email" className="text-sm font-light">Use "Add to calendar" email as the organizer</Label>
                  </div>
                </div>

                <div>
                  <Label className="font-light">Default</Label>
                  <Input defaultValue="sanskarix@gmail.com" className="font-light" />
                  <p className="text-sm text-muted-foreground mt-1 font-light">We'll display this email address as the organizer, and send confirmation emails here.</p>
                </div>

                <div>
                  <Label className="font-light">Layout</Label>
                  <p className="text-sm text-muted-foreground mb-3 font-light">You can select multiple and your bookers can switch views.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label className="font-light">Month</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label className="font-light">Weekly</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label className="font-light">Column</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="font-light">Default view</Label>
                  <Select defaultValue="month">
                    <SelectTrigger className="font-light">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month" className="font-light">Month</SelectItem>
                      <SelectItem value="weekly" className="font-light">Weekly</SelectItem>
                      <SelectItem value="column" className="font-light">Column</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1 font-light">You can manage this for all your event types in Settings → Appearance or Override for this event only.</p>
                </div>

                <div>
                  <h3 className="text-lg font-light mb-4">Booking Questions</h3>
                  <p className="text-sm text-muted-foreground mb-4 font-light">Customize the questions asked on the booking page</p>
                  <div className="space-y-3">
                    {bookingQuestions.map((question) => (
                      <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Switch checked={question.enabled} />
                          <div>
                            <p className="font-light text-sm">{question.question}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={question.required ? "default" : "secondary"} className="text-xs font-light">
                                {question.required ? "Required" : question.enabled ? "Optional" : "Hidden"}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-light">{question.type}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4 bg-[#007ee5] hover:bg-[#0066cc] font-light">
                    <Plus className="w-4 h-4 mr-2" />
                    Add a question
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Switch id="requires-confirmation" />
                    <div>
                      <Label htmlFor="requires-confirmation" className="font-light">Requires confirmation</Label>
                      <p className="text-sm text-muted-foreground font-light">The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="enable-captcha" />
                    <div>
                      <Label htmlFor="enable-captcha" className="font-light">Enable captcha on Booking page</Label>
                      <p className="text-sm text-muted-foreground font-light">By enabling captcha, you'll prevent automated bots from booking you.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="email-verification" />
                    <div>
                      <Label htmlFor="email-verification" className="font-light">Requires booker email verification</Label>
                      <p className="text-sm text-muted-foreground font-light">To ensure booker's email verification before scheduling events</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="hide-notes" />
                    <div>
                      <Label htmlFor="hide-notes" className="font-light">Hide notes in calendar</Label>
                      <p className="text-sm text-muted-foreground font-light">For privacy reasons, additional inputs and notes will be hidden in the calendar entry. They will still be sent to your email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="disable-cancel-reschedule" />
                    <div>
                      <Label htmlFor="disable-cancel-reschedule" className="font-light">Disable Cancel and Reschedule options for this event type</Label>
                      <p className="text-sm text-muted-foreground font-light">Attendees will not be able to cancel or reschedule their bookings</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="hide-calendar-details" />
                    <div>
                      <Label htmlFor="hide-calendar-details" className="font-light">Hide calendar event details on shared calendars</Label>
                      <p className="text-sm text-muted-foreground font-light">When a calendar is shared, events are visible to readers but their details are hidden from those without write access.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="redirect-booking" />
                    <div>
                      <Label htmlFor="redirect-booking" className="font-light">Redirect on booking</Label>
                      <p className="text-sm text-muted-foreground font-light">Redirect to a custom URL after a successful booking</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="private-links" />
                    <div>
                      <Label htmlFor="private-links" className="font-light">Private Links</Label>
                      <p className="text-sm text-muted-foreground font-light">Generate private URLs without exposing the username, which will be destroyed once used</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="offer-seats" />
                    <div>
                      <Label htmlFor="offer-seats" className="font-light">Offer seats</Label>
                      <p className="text-sm text-muted-foreground font-light">Offer seats for booking. This automatically disables guest & opt-in bookings.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="lock-timezone" />
                    <div>
                      <Label htmlFor="lock-timezone" className="font-light">Lock timezone on booking page</Label>
                      <p className="text-sm text-muted-foreground font-light">To lock the timezone on booking page, useful for in-person events.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="font-light">Event type color</Label>
                  <p className="text-sm text-muted-foreground mb-2 font-light">This is only used for event type & booking differentiation within the app. It is not displayed to bookers.</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#007ee5] rounded border"></div>
                    <Input defaultValue="#007ee5" className="w-32 font-light" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t mt-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="font-light">Cancel</Button>
          <Button className="bg-[#007ee5] hover:bg-[#0066cc] font-light">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}