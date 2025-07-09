
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateEventDialog({ isOpen, onClose, currentTab, teams }) {
  const [selectedTarget, setSelectedTarget] = useState(currentTab);
  const [title, setTitle] = useState("");
  const [urlSlug, setUrlSlug] = useState("new-event");
  const [description, setDescription] = useState("A quick video meeting");
  const [duration, setDuration] = useState("30");
  const [durationType, setDurationType] = useState("minutes");
  const navigate = useNavigate();

  const getTargetData = (target) => {
    if (target === "personal") {
      return { name: "Personal", url: "cal.id/sanskar" };
    }
    const team = teams.find(t => t.id === target);
    return team ? { name: team.name, url: team.url } : { name: "Personal", url: "cal.id/sanskar" };
  };

  const currentTargetData = getTargetData(selectedTarget);

  const handleCreate = () => {
    // Navigate to edit page with new event data
    navigate(`/event-types/edit/new`, { 
      state: { 
        title, 
        urlSlug, 
        description, 
        duration: `${duration}${durationType === 'minutes' ? 'm' : 'h'}`,
        target: selectedTarget 
      } 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a new event type</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Create a new event type for people to book times with.
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="target">Create for</Label>
            <Select value={selectedTarget} onValueChange={setSelectedTarget}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-l-md border border-r-0">
                {currentTargetData.url}/
              </span>
              <Input 
                id="url" 
                value={urlSlug} 
                onChange={(e) => setUrlSlug(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A quick video meeting"
              className="text-muted-foreground"
            />
          </div>

          <div>
            <Label>Duration</Label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="flex-1"
                min="1"
              />
              <Select value={durationType} onValueChange={setDurationType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleCreate}
            className="bg-[#007ee5] hover:bg-[#0066cc]"
            disabled={!title.trim()}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
