import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useApplications } from '@/hooks/useApplications';
import { Sprint } from '@/hooks/useSprints';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

const SprintDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasApplied, createApplication } = useApplications();
  const { toast } = useToast();

  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    portfolio_link: '',
    availability: '',
    additional_info: '',
  });

  useEffect(() => {
    const fetchSprint = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('sprints')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching sprint:', error);
        navigate('/sprints');
      } else {
        setSprint(data as Sprint);
      }
      setLoading(false);
    };

    fetchSprint();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/auth');
      return;
    }

    if (!formData.motivation || !formData.experience || !formData.availability) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    const { error } = await createApplication(id!, formData);
    setSubmitting(false);

    if (!error) {
      setShowForm(false);
      navigate('/dashboard/applications');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!sprint) {
    return null;
  }

  const alreadyApplied = hasApplied(sprint.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/sprints')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sprints
          </Button>

          {/* Sprint Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <Badge
                    variant={sprint.sprint_type === 'design' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {sprint.sprint_type === 'design' ? '🎨 Design Sprint' : '💻 Development Sprint'}
                  </Badge>
                  {!sprint.is_accepting_applications && (
                    <Badge variant="outline">Applications Closed</Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{sprint.title}</h1>
                <p className="text-muted-foreground text-lg mb-6">{sprint.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{sprint.duration_days} days</p>
                  </div>
                  {sprint.max_participants && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Users className="h-5 w-5 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Max Participants</p>
                      <p className="font-semibold">{sprint.max_participants}</p>
                    </div>
                  )}
                  {sprint.start_date && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Calendar className="h-5 w-5 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-semibold">
                        {new Date(sprint.start_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                  {sprint.end_date && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Calendar className="h-5 w-5 text-secondary mb-2" />
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-semibold">
                        {new Date(sprint.end_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {sprint.eligibility && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Eligibility</h3>
                    <p className="text-muted-foreground">{sprint.eligibility}</p>
                  </div>
                )}

                {/* Apply Button */}
                {sprint.is_accepting_applications && (
                  <div>
                    {alreadyApplied ? (
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">You've already applied to this sprint</span>
                      </div>
                    ) : user ? (
                      <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-gradient-primary text-primary-foreground"
                        size="lg"
                      >
                        {showForm ? 'Cancel' : 'Apply Now'}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate('/auth')}
                        className="bg-gradient-primary text-primary-foreground"
                        size="lg"
                      >
                        Sign in to Apply
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Application Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Application Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="motivation">
                        Why do you want to join this sprint? *
                      </Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) =>
                          setFormData({ ...formData, motivation: e.target.value })
                        }
                        placeholder="Tell us your motivation and what you hope to achieve..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">
                        Relevant experience *
                      </Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData({ ...formData, experience: e.target.value })
                        }
                        placeholder="Describe your relevant skills and experience..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio_link">
                        Portfolio / GitHub / LinkedIn URL
                      </Label>
                      <Input
                        id="portfolio_link"
                        type="url"
                        value={formData.portfolio_link}
                        onChange={(e) =>
                          setFormData({ ...formData, portfolio_link: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">
                        Availability during the sprint *
                      </Label>
                      <Textarea
                        id="availability"
                        value={formData.availability}
                        onChange={(e) =>
                          setFormData({ ...formData, availability: e.target.value })
                        }
                        placeholder="How many hours per day/week can you dedicate? Any scheduling constraints?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional_info">
                        Anything else you'd like us to know?
                      </Label>
                      <Textarea
                        id="additional_info"
                        value={formData.additional_info}
                        onChange={(e) =>
                          setFormData({ ...formData, additional_info: e.target.value })
                        }
                        placeholder="Optional additional information..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary text-primary-foreground"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SprintDetails;
