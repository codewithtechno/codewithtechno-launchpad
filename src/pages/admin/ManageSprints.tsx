import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useSprints, Sprint } from '@/hooks/useSprints';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

const ManageSprints = () => {
  const { user } = useAuth();
  const { sprints, loading, createSprint, updateSprint, deleteSprint } = useSprints();
  const [isOpen, setIsOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', sprint_type: 'design' as 'design' | 'development',
    duration_days: 14, start_date: '', end_date: '', eligibility: '',
    max_participants: 30, is_active: true, is_accepting_applications: true,
  });

  const resetForm = () => {
    setFormData({ title: '', description: '', sprint_type: 'design', duration_days: 14, start_date: '', end_date: '', eligibility: '', max_participants: 30, is_active: true, is_accepting_applications: true });
    setEditingSprint(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const sprintData = { ...formData, created_by: user?.id, start_date: formData.start_date || null, end_date: formData.end_date || null, cover_image_url: null };
    
    if (editingSprint) {
      await updateSprint(editingSprint.id, sprintData);
    } else {
      await createSprint(sprintData);
    }
    
    setSubmitting(false);
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setFormData({
      title: sprint.title, description: sprint.description || '', sprint_type: sprint.sprint_type,
      duration_days: sprint.duration_days, start_date: sprint.start_date || '', end_date: sprint.end_date || '',
      eligibility: sprint.eligibility || '', max_participants: sprint.max_participants || 30,
      is_active: sprint.is_active, is_accepting_applications: sprint.is_accepting_applications,
    });
    setIsOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Sprints</h1>
            <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-2" />Create Sprint</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingSprint ? 'Edit Sprint' : 'Create Sprint'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Title *</Label>
                      <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Description</Label>
                      <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <Select value={formData.sprint_type} onValueChange={(v) => setFormData({ ...formData, sprint_type: v as 'design' | 'development' })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (days)</Label>
                      <Input type="number" value={formData.duration_days} onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Participants</Label>
                      <Input type="number" value={formData.max_participants} onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })} />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Eligibility</Label>
                      <Textarea value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} rows={2} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={formData.is_active} onCheckedChange={(c) => setFormData({ ...formData, is_active: c })} />
                      <Label>Active</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={formData.is_accepting_applications} onCheckedChange={(c) => setFormData({ ...formData, is_accepting_applications: c })} />
                      <Label>Accepting Applications</Label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingSprint ? 'Update Sprint' : 'Create Sprint'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {sprints.map((sprint) => (
              <Card key={sprint.id} className="bg-card border-border">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={sprint.sprint_type === 'design' ? 'default' : 'secondary'}>{sprint.sprint_type}</Badge>
                      {!sprint.is_active && <Badge variant="outline">Inactive</Badge>}
                      {sprint.is_accepting_applications && <Badge variant="outline" className="text-primary border-primary">Open</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold">{sprint.title}</h3>
                    <p className="text-sm text-muted-foreground">{sprint.duration_days} days • Max {sprint.max_participants} participants</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(sprint)}><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" onClick={() => deleteSprint(sprint.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManageSprints;
