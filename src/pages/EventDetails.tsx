import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useEventRegistrations, Event } from '@/hooks/useEvents';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Clock, MapPin, Wifi, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  
  const { userRegistration, fetchUserRegistration, registerForEvent } = useEventRegistrations(id);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        toast({ title: 'Error', description: 'Event not found', variant: 'destructive' });
        navigate('/events');
      } else {
        setEvent(data as Event);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (user && id) {
      fetchUserRegistration(user.id);
    }
  }, [user, id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/auth', { state: { from: `/events/${id}` } });
      return;
    }

    if (!id) return;

    setRegistering(true);
    await registerForEvent(user.id, { event_id: id });
    setRegistering(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const isRegistered = !!userRegistration;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {event.cover_image_url && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden">
                    <img
                      src={event.cover_image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <Badge variant={event.event_type === 'online' ? 'default' : 'secondary'} className="text-sm">
                      {event.event_type === 'online' ? <Wifi className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                      {event.event_type === 'online' ? 'Online Event' : 'Offline Event'}
                    </Badge>
                    {event.is_paid ? (
                      <Badge variant="outline" className="text-green-500 border-green-500 text-sm">
                        Paid Event
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-primary border-primary text-sm">
                        Free Event
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

                  {event.description && (
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      <p className="text-lg text-muted-foreground whitespace-pre-wrap">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-card border-border sticky top-24">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(event.event_date)}</p>
                      </div>
                    </div>

                    {event.event_time && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">{event.event_time}</p>
                        </div>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center gap-3">
                        {event.event_type === 'online' ? (
                          <Wifi className="h-5 w-5 text-primary" />
                        ) : (
                          <MapPin className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <p className="font-medium">{event.event_type === 'online' ? 'Platform' : 'Location'}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-sm text-muted-foreground">Max {event.max_participants} participants</p>
                      </div>
                    </div>

                    {event.is_paid && (
                      <div className="border-t border-border pt-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold">₹{event.early_bird_price || event.ticket_price}</span>
                          {event.early_bird_price && event.early_bird_price < (event.ticket_price || 0) && (
                            <span className="text-sm text-muted-foreground line-through">₹{event.ticket_price}</span>
                          )}
                        </div>
                        {event.early_bird_seats && event.early_bird_price && (
                          <p className="text-sm text-green-500">Early bird price for first {event.early_bird_seats} registrations</p>
                        )}
                      </div>
                    )}

                    <div className="pt-4">
                      {isRegistered ? (
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="font-semibold text-primary">You're Registered!</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Status: {userRegistration.status}
                          </p>
                        </div>
                      ) : event.is_accepting_registrations ? (
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleRegister}
                          disabled={registering}
                        >
                          {registering ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Registering...
                            </>
                          ) : event.is_paid ? (
                            `Register - ₹${event.early_bird_price || event.ticket_price}`
                          ) : (
                            'Register for Free'
                          )}
                        </Button>
                      ) : (
                        <Button className="w-full" size="lg" disabled>
                          Registration Closed
                        </Button>
                      )}

                      {!user && event.is_accepting_registrations && (
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          You'll need to sign in to register
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;
