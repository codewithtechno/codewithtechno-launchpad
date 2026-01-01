import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, Clock, MapPin, Wifi, ExternalLink } from 'lucide-react';

interface EventWithRegistration {
  id: string;
  event_id: string;
  status: string;
  created_at: string;
  event: {
    id: string;
    title: string;
    event_type: 'online' | 'offline';
    event_date: string;
    event_time: string | null;
    location: string | null;
    cover_image_url: string | null;
    is_paid: boolean;
    ticket_price: number | null;
  };
}

const MyEventRegistrations = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<EventWithRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          id,
          event_id,
          status,
          created_at,
          event:events(id, title, event_type, event_date, event_time, location, cover_image_url, is_paid, ticket_price)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Filter out registrations where event is null (deleted events)
        const validRegistrations = data.filter(r => r.event !== null) as unknown as EventWithRegistration[];
        setRegistrations(validRegistrations);
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, [user]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-8">My Event Registrations</h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : registrations.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
                <p className="text-muted-foreground mb-6">You haven't registered for any events.</p>
                <Link to="/events">
                  <Button>Browse Events</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <Card key={registration.id} className="bg-card border-border overflow-hidden">
                  <CardContent className="p-0 flex">
                    {registration.event.cover_image_url && (
                      <div className="w-32 h-28 flex-shrink-0">
                        <img
                          src={registration.event.cover_image_url}
                          alt={registration.event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className={getStatusColor(registration.status)}>
                              {registration.status}
                            </Badge>
                            <Badge variant={registration.event.event_type === 'online' ? 'default' : 'secondary'}>
                              {registration.event.event_type === 'online' ? (
                                <Wifi className="h-3 w-3 mr-1" />
                              ) : (
                                <MapPin className="h-3 w-3 mr-1" />
                              )}
                              {registration.event.event_type}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{registration.event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(registration.event.event_date)}
                            </span>
                            {registration.event.event_time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {registration.event.event_time}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link to={`/events/${registration.event.id}`}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MyEventRegistrations;
