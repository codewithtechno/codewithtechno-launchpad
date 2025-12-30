import { motion } from 'framer-motion';
import { useSprints, Sprint } from '@/hooks/useSprints';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Rocket } from 'lucide-react';

const Sprints = () => {
  const { sprints, loading } = useSprints();
  const { hasApplied } = useApplications();
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeSprints = sprints.filter((s) => s.is_active && s.is_accepting_applications);
  const upcomingSprints = sprints.filter((s) => s.is_active && !s.is_accepting_applications);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Sprints</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our intensive design and development sprints to build real projects and accelerate your growth.
            </p>
          </motion.div>

          {/* Open Sprints */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              Open for Applications
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                      <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-20 bg-muted rounded mb-4"></div>
                      <div className="h-10 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : activeSprints.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Rocket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No sprints are currently open</p>
                  <p className="text-muted-foreground">
                    Check back soon for new opportunities!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSprints.map((sprint, index) => (
                  <SprintCard
                    key={sprint.id}
                    sprint={sprint}
                    index={index}
                    hasApplied={hasApplied(sprint.id)}
                    isLoggedIn={!!user}
                    onApply={() => navigate(user ? `/sprints/${sprint.id}` : '/auth')}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Upcoming Sprints */}
          {upcomingSprints.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-secondary" />
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingSprints.map((sprint, index) => (
                  <SprintCard
                    key={sprint.id}
                    sprint={sprint}
                    index={index}
                    isUpcoming
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface SprintCardProps {
  sprint: Sprint;
  index: number;
  hasApplied?: boolean;
  isLoggedIn?: boolean;
  isUpcoming?: boolean;
  onApply?: () => void;
}

const SprintCard = ({
  sprint,
  index,
  hasApplied,
  isLoggedIn,
  isUpcoming,
  onApply,
}: SprintCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card border-border hover:shadow-card-hover transition-all h-full flex flex-col">
        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-4">
            <Badge
              variant={sprint.sprint_type === 'design' ? 'default' : 'secondary'}
            >
              {sprint.sprint_type === 'design' ? '🎨 Design' : '💻 Development'}
            </Badge>
            {isUpcoming && (
              <Badge variant="outline">Coming Soon</Badge>
            )}
          </div>

          <h3 className="text-xl font-bold mb-3">{sprint.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
            {sprint.description}
          </p>

          <div className="space-y-2 mb-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{sprint.duration_days} days</span>
            </div>
            {sprint.max_participants && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Max {sprint.max_participants} participants</span>
              </div>
            )}
            {sprint.start_date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Starts {new Date(sprint.start_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>

          {!isUpcoming && (
            <div>
              {hasApplied ? (
                <Button disabled className="w-full" variant="outline">
                  Already Applied
                </Button>
              ) : (
                <Button
                  onClick={onApply}
                  className="w-full bg-gradient-primary text-primary-foreground"
                >
                  {isLoggedIn ? 'Apply Now' : 'Sign in to Apply'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Sprints;
