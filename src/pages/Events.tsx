import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEvents } from '@/hooks/useEvents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Clock, MapPin, Wifi, Users, ArrowRight } from 'lucide-react';

const Events = () => {
  const { events, loading } = useEvents();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const activeEvents = events.filter(event => event.is_active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming <span className="text-gradient">Events</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our workshops, sessions, and meetups to learn, network, and grow with the community.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activeEvents.length === 0 ? (
            <Card className="max-w-md mx-auto bg-card border-border">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                <p className="text-muted-foreground">Check back soon for new events!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border overflow-hidden hover:shadow-elegant transition-shadow h-full flex flex-col">
                    {event.cover_image_url ? (
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={event.cover_image_url} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-gradient-primary flex items-center justify-center">
                        <Calendar className="h-12 w-12 text-primary-foreground opacity-50" />
                      </div>
                    )}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant={event.event_type === 'online' ? 'default' : 'secondary'}>
                          {event.event_type === 'online' ? <Wifi className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                          {event.event_type}
                        </Badge>
                        {event.is_paid ? (
                          <Badge variant="outline" className="text-green-500 border-green-500">
                            ₹{event.early_bird_price || event.ticket_price}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-primary border-primary">Free</Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      
                      {event.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                        {event.event_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.event_time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            {event.event_type === 'online' ? <Wifi className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Max {event.max_participants} participants</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <Link to={`/events/${event.id}`}>
                          <Button className="w-full" disabled={!event.is_accepting_registrations}>
                            {event.is_accepting_registrations ? (
                              <>
                                View Details
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </>
                            ) : (
                              'Registration Closed'
                            )}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
