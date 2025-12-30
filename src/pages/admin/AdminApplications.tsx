import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useApplications } from '@/hooks/useApplications';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';

const AdminApplications = () => {
  const { allApplications, updateApplicationStatus } = useApplications();
  const [filter, setFilter] = useState<string>('all');

  const filteredApps = filter === 'all' ? allApplications : allApplications.filter((a) => a.status === filter);

  const handleStatusChange = async (id: string, status: 'pending' | 'accepted' | 'rejected') => {
    await updateApplicationStatus(id, status);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Applications</h1>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredApps.map((app) => (
              <Card key={app.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={app.sprints?.sprint_type === 'design' ? 'default' : 'secondary'}>{app.sprints?.sprint_type}</Badge>
                        <Badge variant={app.status === 'accepted' ? 'default' : app.status === 'rejected' ? 'destructive' : 'outline'}>
                          {app.status === 'accepted' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {app.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {app.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {app.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{app.profiles?.full_name || 'No name'}</h3>
                      <p className="text-sm text-muted-foreground">{app.profiles?.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">Applied for: {app.sprints?.title}</p>
                    </div>
                    <div className="flex gap-2">
                      {app.status !== 'accepted' && (
                        <Button size="sm" onClick={() => handleStatusChange(app.id, 'accepted')}>Accept</Button>
                      )}
                      {app.status !== 'rejected' && (
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(app.id, 'rejected')}>Reject</Button>
                      )}
                    </div>
                  </div>
                  
                  {app.motivation && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Motivation:</p>
                      <p className="text-sm text-muted-foreground">{app.motivation}</p>
                    </div>
                  )}
                  {app.experience && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Experience:</p>
                      <p className="text-sm text-muted-foreground">{app.experience}</p>
                    </div>
                  )}
                  {app.portfolio_link && (
                    <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary flex items-center gap-1">
                      Portfolio <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminApplications;
