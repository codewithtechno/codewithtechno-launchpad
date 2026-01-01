import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: 'online' | 'offline';
  event_date: string;
  event_time: string | null;
  location: string | null;
  cover_image_url: string | null;
  is_paid: boolean;
  ticket_price: number | null;
  early_bird_price: number | null;
  early_bird_seats: number | null;
  max_participants: number | null;
  is_active: boolean;
  is_accepting_registrations: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  status: string;
  payment_status: string | null;
  payment_id: string | null;
  payment_amount: number | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch events', variant: 'destructive' });
    } else {
      setEvents((data as Event[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (eventData: Omit<Partial<Event>, 'id' | 'created_at' | 'updated_at'> & { event_date: string; title: string }) => {
    const { error } = await supabase.from('events').insert([eventData as any]);
    if (error) {
      toast({ title: 'Error', description: 'Failed to create event', variant: 'destructive' });
      return false;
    }
    toast({ title: 'Success', description: 'Event created successfully' });
    fetchEvents();
    return true;
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    const { error } = await supabase.from('events').update(eventData).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to update event', variant: 'destructive' });
      return false;
    }
    toast({ title: 'Success', description: 'Event updated successfully' });
    fetchEvents();
    return true;
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete event', variant: 'destructive' });
      return false;
    }
    toast({ title: 'Success', description: 'Event deleted successfully' });
    fetchEvents();
    return true;
  };

  return { events, loading, fetchEvents, createEvent, updateEvent, deleteEvent };
};

export const useEventRegistrations = (eventId?: string) => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [userRegistration, setUserRegistration] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRegistrations = async () => {
    if (!eventId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId);

    if (error) {
      console.error('Error fetching registrations:', error);
    } else {
      setRegistrations((data as EventRegistration[]) || []);
    }
    setLoading(false);
  };

  const fetchUserRegistration = async (userId: string) => {
    if (!eventId || !userId) return;
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .maybeSingle();

    if (!error && data) {
      setUserRegistration(data as EventRegistration);
    } else {
      setUserRegistration(null);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchRegistrations();
    }
  }, [eventId]);

  const registerForEvent = async (userId: string, eventData: { event_id: string }) => {
    const { error } = await supabase.from('event_registrations').insert([{
      user_id: userId,
      event_id: eventData.event_id,
      status: 'registered',
    }]);
    
    if (error) {
      if (error.code === '23505') {
        toast({ title: 'Already Registered', description: 'You have already registered for this event', variant: 'destructive' });
      } else {
        toast({ title: 'Error', description: 'Failed to register for event', variant: 'destructive' });
      }
      return false;
    }
    
    toast({ title: 'Success', description: 'Successfully registered for event!' });
    fetchRegistrations();
    fetchUserRegistration(userId);
    return true;
  };

  return { 
    registrations, 
    userRegistration, 
    loading, 
    fetchRegistrations, 
    fetchUserRegistration, 
    registerForEvent 
  };
};
