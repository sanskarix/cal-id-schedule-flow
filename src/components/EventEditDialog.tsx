
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Edit, Globe, Clock, MapPin, Calendar, Settings, BarChart3, Zap } from "lucide-react";

export function EventEditDialog({ event, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("setup");

  if (!event) return null;

  const workingDays = [
    { day: "Monday", start: "9:00 am", end: "5:00 pm", enabled: true },
    { day: "Tuesday", start: "9:00 am", end: "5:00 pm", enabled: true },
    { day: "Wednesday", start: "9:00 am", end: "5:00 pm", enabled: true },
    { day: "Thursday", start: "9:00 am", end: "5:00 pm", enabled: true },
    { day: "Friday", start: "9:00 am", end: "5:00 pm", enabled: true },
    { day: "Saturday", start: "9:00 am", end: "5:00 pm", enabled: false },
    { day: "Sunday", start: "9:00 am", end: "5:00 pm", enabled: false },
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`w-6 h-6 ${event.color} rounded flex items-center justify-center text-white text-xs`}>
              <Zap className="w-3 h-3" />
            </div>
            Edit Event Type: {event.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="setup" className="text-xs">Setup</TabsTrigger>
            <TabsTrigger value="availability" className="text-xs">Availability</TabsTrigger>
            <TabsTrigger value="limits" className="text-xs">Limits</TabsTrigger>
            <TabsTrigger value="apps" className="text-xs">Apps</TabsTrigger>
            <TabsTrigger value="workflows" className="text-xs">Workflows</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
          </TabsList>

          {/* Event Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue={event.title} />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={event.description} />
                <div className="flex items-center gap-2 mt-2">
                  <Switch id="ai-translate" />
                  <Label htmlFor="ai-translate" className="text-sm">Translate description to the visitor's browser language using AI</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">cal.id/sanskar/</span>
                  <Input id="url" defaultValue="product-demo" className="flex-1" />
                </div>
              </div>

              <div>
                <Label>Available durations</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">30m</Badge>
                  <Badge variant="outline">45m</Badge>
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Default duration</Label>
                <Select defaultValue="30m">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30m">30m</SelectItem>
                    <SelectItem value="45m">45m</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 mt-2">
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
              </div>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Working Hours</h3>
              <div className="space-y-3">
                {workingDays.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-20">
                      <Checkbox checked={day.enabled} />
                      <Label className="ml-2 text-sm">{day.day}</Label>
                    </div>
                    <Input defaultValue={day.start} className="w-32" disabled={!day.enabled} />
                    <span className="text-muted-foreground">-</span>
                    <Input defaultValue={day.end} className="w-32" disabled={!day.enabled} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Label>Timezone</Label>
                <Select defaultValue="asia-calcutta">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-calcutta">Asia/Calcutta</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="america-new-york">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Limits Tab */}
          <TabsContent value="limits" className="space-y-6">
            <div className="space-y-6">
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

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="limit-frequency" />
                  <Label htmlFor="limit-frequency">Limit booking frequency</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="first-slot-only" />
                  <Label htmlFor="first-slot-only">Only show the first slot of each day as available</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="limit-duration" />
                  <Label htmlFor="limit-duration">Limit total booking duration</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="limit-future" />
                  <Label htmlFor="limit-future">Limit future bookings</Label>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Installed Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No apps installed yet</p>
                  <Button className="mt-4">Browse our app store</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Tiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-500" />
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
                      <Calendar className="w-5 h-5 text-green-500" />
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

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-6">
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
              </div>

              <div>
                <Label>Layout</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <Label>Month</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <Label>Weekly</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked />
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
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Booking Questions</h3>
                <div className="space-y-3">
                  {bookingQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={question.enabled} />
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
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add a question
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Switch id="requires-confirmation" />
                  <Label htmlFor="requires-confirmation">Requires confirmation</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="enable-captcha" />
                  <Label htmlFor="enable-captcha">Enable captcha on Booking page</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="email-verification" />
                  <Label htmlFor="email-verification">Requires booker email verification</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="hide-notes" />
                  <Label htmlFor="hide-notes">Hide notes in calendar</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="disable-cancel-reschedule" />
                  <Label htmlFor="disable-cancel-reschedule">Disable Cancel and Reschedule options for this event type</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
