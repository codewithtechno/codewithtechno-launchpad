import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useSprints } from '@/hooks/useSprints';
import { useApplications } from '@/hooks/useApplications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Users, FileText, Rocket, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const { sprints } = useSprints();
  const { allApplications } = useApplications();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      setUserCount(count || 0);
    };
    fetchUserCount();
  }, []);

  const activeSprints = sprints.filter((s) => s.is_active);
  const pendingApps = allApplications.filter((a) => a.status === 'pending');
  const acceptedApps = allApplications.filter((a) => a.status === 'accepted');

  const stats = [
    { label: 'Total Users', value: userCount, icon: Users, color: 'text-primary' },
    { label: 'Active Sprints', value: activeSprints.length, icon: Rocket, color: 'text-secondary' },
    { label: 'Total Applications', value: allApplications.length, icon: FileText, color: 'text-primary' },
    { label: 'Pending Review', value: pendingApps.length, icon: CheckCircle2, color: 'text-yellow-500' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {allApplications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{app.profiles?.full_name || app.profiles?.email}</p>
                    <p className="text-sm text-muted-foreground">{app.sprints?.title}</p>
                  </div>
                  <span className={`text-sm font-medium ${app.status === 'pending' ? 'text-yellow-500' : app.status === 'accepted' ? 'text-primary' : 'text-destructive'}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
