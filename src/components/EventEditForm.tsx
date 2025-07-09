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
import { Plus, Trash2, Edit, ArrowLeft, Bold, Italic, Link2, ExternalLink } from "lucide-react";
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
            <TabsTrigger value="setup" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Setup</TabsTrigger>
            <TabsTrigger value="availability" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Availability</TabsTrigger>
            <TabsTrigger value="limits" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Limits</TabsTrigger>
            <TabsTrigger value="apps" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Apps</TabsTrigger>
            <TabsTrigger value="workflows" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Workflows</TabsTrigger>
            <TabsTrigger value="recurring" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Recurring</TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs data-[state=active]:bg-[#007ee5]/10 data-[state=active]:text-[#007ee5]">Advanced</TabsTrigger>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Limits Tab */}
          <TabsContent value="limits" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Limits configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Apps integration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6 mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Workflows configuration coming soon...</p>
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
              <CardContent className="p-6">
                <p className="text-muted-foreground">Advanced settings coming soon...</p>
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
