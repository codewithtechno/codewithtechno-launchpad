import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Sprint {
  id: string;
  title: string;
  description: string | null;
  sprint_type: 'design' | 'development';
  duration_days: number;
  start_date: string | null;
  end_date: string | null;
  eligibility: string | null;
  max_participants: number | null;
  is_active: boolean;
  is_accepting_applications: boolean;
  cover_image_url: string | null;
  is_paid: boolean;
  ticket_price: number | null;
  early_bird_price: number | null;
  early_bird_seats: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useSprints() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSprints = async () => {
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sprints:', error);
    } else {
      setSprints(data as Sprint[]);
    }
    setLoading(false);
  };

  const createSprint = async (sprint: Omit<Sprint, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('sprints')
      .insert(sprint)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create sprint',
        variant: 'destructive',
      });
      return { data: null, error };
    }

    toast({
      title: 'Success',
      description: 'Sprint created successfully',
    });

    await fetchSprints();
    return { data: data as Sprint, error: null };
  };

  const updateSprint = async (id: string, updates: Partial<Sprint>) => {
    const { error } = await supabase
      .from('sprints')
      .update(updates)
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update sprint',
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Success',
      description: 'Sprint updated successfully',
    });

    await fetchSprints();
    return { error: null };
  };

  const deleteSprint = async (id: string) => {
    const { error } = await supabase
      .from('sprints')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete sprint',
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Success',
      description: 'Sprint deleted successfully',
    });

    await fetchSprints();
    return { error: null };
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  return { sprints, loading, createSprint, updateSprint, deleteSprint, refetch: fetchSprints };
}
