import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useApplications } from '@/hooks/useApplications';
import { useSprints } from '@/hooks/useSprints';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { applications } = useApplications();
  const { sprints } = useSprints();

  const activeSprints = sprints.filter((s) => s.is_accepting_applications);
  const pendingApps = applications.filter((a) => a.status === 'pending');
  const acceptedApps = applications.filter((a) => a.status === 'accepted');

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your journey with CodeWithTechno.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Applications
                </CardTitle>
                <FileText className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Review
                </CardTitle>
                <Clock className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingApps.length}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Accepted
                </CardTitle>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{acceptedApps.length}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Sprints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Open Sprints</h2>
            <Link to="/sprints">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {activeSprints.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-8 text-center">
                <Rocket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No sprints are currently accepting applications.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back soon for new opportunities!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSprints.slice(0, 4).map((sprint) => (
                <Card key={sprint.id} className="bg-card border-border hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant={sprint.sprint_type === 'design' ? 'default' : 'secondary'}
                      >
                        {sprint.sprint_type === 'design' ? '🎨 Design' : '💻 Development'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {sprint.duration_days} days
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{sprint.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {sprint.description}
                    </p>
                    <Link to={`/sprints/${sprint.id}`}>
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Applications */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Link to="/dashboard/applications">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{app.sprints?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Applied {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          app.status === 'accepted'
                            ? 'default'
                            : app.status === 'rejected'
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {app.status === 'accepted' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {app.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                        {app.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
