import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useApplications } from '@/hooks/useApplications';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';

const MyApplications = () => {
  const { applications, loading } = useApplications();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-foreground mb-8">
            Track the status of your sprint applications.
          </p>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card border-border animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : applications.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No applications yet</p>
                <p className="text-muted-foreground">
                  Start your journey by applying to a sprint!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="bg-card border-border hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge
                            variant={
                              app.sprints?.sprint_type === 'design' ? 'default' : 'secondary'
                            }
                            className="mb-2"
                          >
                            {app.sprints?.sprint_type === 'design' ? '🎨 Design' : '💻 Development'}
                          </Badge>
                          <h3 className="text-xl font-semibold">{app.sprints?.title}</h3>
                        </div>
                        <Badge
                          variant={
                            app.status === 'accepted'
                              ? 'default'
                              : app.status === 'rejected'
                              ? 'destructive'
                              : 'outline'
                          }
                          className="flex items-center gap-1"
                        >
                          {app.status === 'accepted' && <CheckCircle2 className="h-3 w-3" />}
                          {app.status === 'rejected' && <XCircle className="h-3 w-3" />}
                          {app.status === 'pending' && <Clock className="h-3 w-3" />}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Applied on</p>
                          <p className="font-medium">
                            {new Date(app.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        {app.sprints?.start_date && (
                          <div>
                            <p className="text-muted-foreground">Sprint starts</p>
                            <p className="font-medium">
                              {new Date(app.sprints.start_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        )}
                      </div>

                      {app.status === 'accepted' && (
                        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                          <p className="text-primary font-medium">
                            🎉 Congratulations! You've been selected for this sprint.
                          </p>
                        </div>
                      )}

                      {app.status === 'rejected' && (
                        <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Unfortunately, your application was not selected. Please try again for future sprints!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MyApplications;
