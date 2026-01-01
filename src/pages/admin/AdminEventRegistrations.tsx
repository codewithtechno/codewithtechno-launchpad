import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calendar, User, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventRegistrationWithDetails {
  id: string;
  user_id: string;
  event_id: string;
  status: string;
  payment_status: string | null;
  created_at: string;
  event: {
    title: string;
    event_date: string;
    event_type: 'online' | 'offline';
  };
  profile: {
    full_name: string | null;
    email: string | null;
  };
}

const AdminEventRegistrations = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<EventRegistrationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        id,
        user_id,
        event_id,
        status,
        payment_status,
        created_at,
        event:events(title, event_date, event_type),
        profile:profiles!event_registrations_user_id_fkey(full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error);
      // Fallback query without profile join
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('event_registrations')
        .select(`
          id,
          user_id,
          event_id,
          status,
          payment_status,
          created_at,
          event:events(title, event_date, event_type)
        `)
        .order('created_at', { ascending: false });

      if (!fallbackError && fallbackData) {
        const registrationsWithoutProfile = fallbackData.map(r => ({
          ...r,
          profile: { full_name: null, email: null }
        })) as unknown as EventRegistrationWithDetails[];
        setRegistrations(registrationsWithoutProfile.filter(r => r.event !== null));
      }
    } else if (data) {
      const validRegistrations = data.filter(r => r.event !== null) as unknown as EventRegistrationWithDetails[];
      setRegistrations(validRegistrations);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('event_registrations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Registration status updated' });
      fetchRegistrations();
    }
  };

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
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredRegistrations = statusFilter === 'all'
    ? registrations
    : registrations.filter(r => r.status === statusFilter);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Event Registrations</h1>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No registrations found</h3>
                <p className="text-muted-foreground">
                  {statusFilter === 'all' ? 'No event registrations yet.' : `No ${statusFilter} registrations.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRegistrations.map((registration) => (
                <Card key={registration.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className={getStatusColor(registration.status)}>
                            {registration.status}
                          </Badge>
                          <Badge variant="secondary">{registration.event.event_type}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">{registration.event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {registration.profile?.full_name || registration.profile?.email || 'Unknown User'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(registration.event.event_date)}
                          </span>
                          <span>Registered: {formatDate(registration.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={registration.status}
                          onValueChange={(value) => updateStatus(registration.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="registered">Registered</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
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

export default AdminEventRegistrations;
