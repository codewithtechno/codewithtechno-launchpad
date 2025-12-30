import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Application {
  id: string;
  user_id: string;
  sprint_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  motivation: string | null;
  experience: string | null;
  portfolio_link: string | null;
  availability: string | null;
  additional_info: string | null;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationWithSprint extends Application {
  sprints: {
    title: string;
    sprint_type: 'design' | 'development';
    start_date: string | null;
    end_date: string | null;
  };
}

export interface ApplicationWithProfile extends Application {
  profiles: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  };
  sprints: {
    title: string;
    sprint_type: 'design' | 'development';
  };
}

export function useApplications() {
  const { user, isAdmin } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithSprint[]>([]);
  const [allApplications, setAllApplications] = useState<ApplicationWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserApplications = async () => {
    if (!user) {
      setApplications([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        sprints (
          title,
          sprint_type,
          start_date,
          end_date
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
    } else {
      setApplications(data as unknown as ApplicationWithSprint[]);
    }
    setLoading(false);
  };

  const fetchAllApplications = async () => {
    if (!isAdmin) return;

    // First fetch applications with sprints
    const { data: appsData, error: appsError } = await supabase
      .from('applications')
      .select(`
        *,
        sprints (
          title,
          sprint_type
        )
      `)
      .order('created_at', { ascending: false });

    if (appsError) {
      console.error('Error fetching all applications:', appsError);
      return;
    }

    // Then fetch profiles for each user
    const userIds = [...new Set(appsData.map((app) => app.user_id))];
    
    if (userIds.length === 0) {
      setAllApplications([]);
      return;
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, full_name, email, phone')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return;
    }

    // Combine data
    const profilesMap = new Map(profilesData.map((p) => [p.user_id, p]));
    const combinedData = appsData.map((app) => ({
      ...app,
      profiles: profilesMap.get(app.user_id) || { full_name: null, email: null, phone: null },
    }));

    setAllApplications(combinedData as unknown as ApplicationWithProfile[]);
  };

  const createApplication = async (
    sprintId: string,
    applicationData: {
      motivation: string;
      experience: string;
      portfolio_link?: string;
      availability: string;
      additional_info?: string;
    }
  ) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        sprint_id: sprintId,
        ...applicationData,
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: 'Already applied',
          description: 'You have already applied to this sprint',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit application',
          variant: 'destructive',
        });
      }
      return { error };
    }

    toast({
      title: 'Application submitted!',
      description: 'We will review your application and get back to you soon.',
    });

    await fetchUserApplications();
    return { error: null };
  };

  const updateApplicationStatus = async (
    id: string,
    status: 'pending' | 'accepted' | 'rejected',
    adminNotes?: string
  ) => {
    if (!user || !isAdmin) return { error: new Error('Not authorized') };

    const { error } = await supabase
      .from('applications')
      .update({
        status,
        admin_notes: adminNotes,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update application',
        variant: 'destructive',
      });
      return { error };
    }

    toast({
      title: 'Success',
      description: `Application ${status}`,
    });

    await fetchAllApplications();
    return { error: null };
  };

  const hasApplied = (sprintId: string) => {
    return applications.some((app) => app.sprint_id === sprintId);
  };

  useEffect(() => {
    fetchUserApplications();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllApplications();
    }
  }, [isAdmin]);

  return {
    applications,
    allApplications,
    loading,
    createApplication,
    updateApplicationStatus,
    hasApplied,
    refetchUser: fetchUserApplications,
    refetchAll: fetchAllApplications,
  };
}
