
import { useParams, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { EventEditForm } from "@/components/EventEditForm";
import { SidebarProvider } from "@/components/ui/sidebar";

const EventEditPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const eventData = location.state;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <main className="flex-1">
          <EventEditForm eventId={id} initialData={eventData} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EventEditPage;
