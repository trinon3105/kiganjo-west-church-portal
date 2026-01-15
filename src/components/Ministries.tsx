import React, { useState, useEffect } from 'react';
import { Users, Music, UserPlus, Smile, Calendar, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MinistryRegistrationDialog from './MinistryRegistrationDialog';
import MinistryEventsDialog from './MinistryEventsDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type MinistryType = 'youth' | 'worship' | 'men' | 'women';

interface Ministry {
  name: string;
  description: string;
  icon: React.ElementType;
  type: MinistryType;
}

const ministryData: Ministry[] = [
  { 
    name: 'Youth Ministry', 
    description: 'Empowering young people through faith and community.',
    icon: Users,
    type: 'youth'
  },
  { 
    name: 'Worship Team', 
    description: 'Leading worship and praise through music.',
    icon: Music,
    type: 'worship'
  },
  { 
    name: "Men's Fellowship", 
    description: 'Building strong Christian men and leaders.',
    icon: UserPlus,
    type: 'men'
  },
  { 
    name: "Women's Ministry", 
    description: 'Supporting and uplifting women in faith.',
    icon: Smile,
    type: 'women'
  }
];

const Ministries: React.FC = () => {
  const { user } = useAuth();
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [registeredMinistries, setRegisteredMinistries] = useState<MinistryType[]>([]);

  useEffect(() => {
    if (user) {
      fetchRegistrations();
      
      // Set up realtime subscription
      const channel = supabase
        .channel('user-registrations')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'ministry_registrations',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchRegistrations();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchRegistrations = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('ministry_registrations')
      .select('ministry')
      .eq('user_id', user.id);

    if (!error && data) {
      setRegisteredMinistries(data.map(r => r.ministry as MinistryType));
    }
  };

  const handleRegisterClick = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setRegistrationOpen(true);
  };

  const handleViewEventsClick = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setEventsOpen(true);
  };

  const isRegistered = (ministryType: MinistryType) => {
    return registeredMinistries.includes(ministryType);
  };

  return (
    <section id="ministries" className="bg-secondary/10 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Our Ministries</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {ministryData.map((ministry, index) => {
          const Icon = ministry.icon;
          const registered = isRegistered(ministry.type);
          
          return (
            <div 
              key={index} 
              className="flex flex-col p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <Icon className="mr-4 text-primary flex-shrink-0" size={48} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{ministry.name}</h3>
                    {registered && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        Registered
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{ministry.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-auto pt-4">
                {!registered ? (
                  <Button 
                    onClick={() => handleRegisterClick(ministry)}
                    className="flex-1"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => handleRegisterClick(ministry)}
                    className="flex-1"
                    disabled
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Registered
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => handleViewEventsClick(ministry)}
                  className="flex-1"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Events
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMinistry && (
        <>
          <MinistryRegistrationDialog
            open={registrationOpen}
            onOpenChange={setRegistrationOpen}
            ministry={selectedMinistry.type}
            ministryName={selectedMinistry.name}
          />
          <MinistryEventsDialog
            open={eventsOpen}
            onOpenChange={setEventsOpen}
            ministry={selectedMinistry.type}
            ministryName={selectedMinistry.name}
          />
        </>
      )}
    </section>
  );
};

export default Ministries;
