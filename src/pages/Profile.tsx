import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    portfolio_url: '',
    linkedin_url: '',
    github_url: '',
    experience_level: '',
  });

  // Initialize form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        portfolio_url: profile.portfolio_url || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        experience_level: profile.experience_level || '',
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground mb-8">
            Update your profile information to help us match you with the right sprints.
          </p>

          <form onSubmit={handleSubmit}>
            <Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 9999999999"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself, your interests, and what you want to achieve..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_level">Experience Level</Label>
                  <Select
                    value={formData.experience_level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, experience_level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                      <SelectItem value="expert">Expert (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border mb-6">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio_url">Portfolio URL</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    value={formData.portfolio_url}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio_url: e.target.value })
                    }
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin_url: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
