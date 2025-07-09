
import { Sidebar } from "@/components/Sidebar";
import { EventTypes } from "@/components/EventTypes";
import { SidebarProvider } from "@/components/ui/sidebar";

const EventTypesPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <main className="flex-1">
          <EventTypes />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EventTypesPage;
