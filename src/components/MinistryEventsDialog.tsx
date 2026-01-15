import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

type MinistryType = 'youth' | 'worship' | 'men' | 'women';

interface MinistryEvent {
  id: string;
  ministry: MinistryType;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  created_at: string;
}

interface MinistryEventsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ministry: MinistryType;
  ministryName: string;
}

const MinistryEventsDialog: React.FC<MinistryEventsDialogProps> = ({
  open,
  onOpenChange,
  ministry,
  ministryName
}) => {
  const [events, setEvents] = useState<MinistryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchEvents();
      
      // Set up realtime subscription
      const channel = supabase
        .channel(`ministry-events-${ministry}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'ministry_events',
            filter: `ministry=eq.${ministry}`
          },
          () => {
            fetchEvents();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [open, ministry]);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ministry_events')
      .select('*')
      .eq('ministry', ministry)
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (!error && data) {
      setEvents(data as MinistryEvent[]);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{ministryName} Events</DialogTitle>
          <DialogDescription>
            Upcoming events and activities for {ministryName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading events...
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming events scheduled for {ministryName}.
            </div>
          ) : (
            events.map((event) => (
              <div 
                key={event.id} 
                className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                {event.description && (
                  <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(event.event_date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{format(new Date(event.event_date), 'p')}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MinistryEventsDialog;
