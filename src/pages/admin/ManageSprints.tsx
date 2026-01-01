import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useSprints, Sprint } from '@/hooks/useSprints';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2, Trash2, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManageSprints = () => {
  const { user } = useAuth();
  const { sprints, loading, createSprint, updateSprint, deleteSprint } = useSprints();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', sprint_type: 'design' as 'design' | 'development',
    duration_days: 14, start_date: '', end_date: '', eligibility: '',
    max_participants: 30, is_active: true, is_accepting_applications: true,
    is_paid: false, ticket_price: '', early_bird_price: '', early_bird_seats: '',
    cover_image_url: '',
  });

  const resetForm = () => {
    setFormData({ 
      title: '', description: '', sprint_type: 'design', duration_days: 14, 
      start_date: '', end_date: '', eligibility: '', max_participants: 30, 
      is_active: true, is_accepting_applications: true,
      is_paid: false, ticket_price: '', early_bird_price: '', early_bird_seats: '',
      cover_image_url: '',
    });
    setEditingSprint(null);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'Image must be less than 5MB', variant: 'destructive' });
      return;
    }
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.cover_image_url || null;
    
    setUploading(true);
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('sprint-covers')
      .upload(fileName, imageFile);
    
    setUploading(false);
    
    if (error) {
      toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('sprint-covers')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, cover_image_url: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const coverImageUrl = await uploadImage();
    
    const sprintData = { 
      ...formData, 
      created_by: user?.id, 
      start_date: formData.start_date || null, 
      end_date: formData.end_date || null, 
      cover_image_url: coverImageUrl,
      ticket_price: formData.is_paid && formData.ticket_price ? parseFloat(formData.ticket_price) : null,
      early_bird_price: formData.is_paid && formData.early_bird_price ? parseFloat(formData.early_bird_price) : null,
      early_bird_seats: formData.is_paid && formData.early_bird_seats ? parseInt(formData.early_bird_seats) : null,
    };
    
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
      is_paid: sprint.is_paid || false,
      ticket_price: sprint.ticket_price?.toString() || '',
      early_bird_price: sprint.early_bird_price?.toString() || '',
      early_bird_seats: sprint.early_bird_seats?.toString() || '',
      cover_image_url: sprint.cover_image_url || '',
    });
    setImagePreview(sprint.cover_image_url || null);
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
                    {/* Cover Image Upload */}
                    <div className="space-y-2 col-span-2">
                      <Label>Cover Image</Label>
                      <div className="flex items-center gap-4">
                        {imagePreview ? (
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-border">
                            <img src={imagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-1 right-1 p-1 bg-background/80 rounded-full hover:bg-background"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-32 h-20 rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/50">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            {imagePreview ? 'Change' : 'Upload'}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1">Max 5MB</p>
                        </div>
                      </div>
                    </div>

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

                    {/* Paid Sprint Section */}
                    <div className="col-span-2 border border-border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Paid Sprint</Label>
                          <p className="text-sm text-muted-foreground">Enable to charge participants</p>
                        </div>
                        <Switch checked={formData.is_paid} onCheckedChange={(c) => setFormData({ ...formData, is_paid: c })} />
                      </div>
                      
                      {formData.is_paid && (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                          <div className="space-y-2">
                            <Label>Ticket Price (₹) *</Label>
                            <Input 
                              type="number" 
                              placeholder="e.g., 999"
                              value={formData.ticket_price} 
                              onChange={(e) => setFormData({ ...formData, ticket_price: e.target.value })}
                              required={formData.is_paid}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Early Bird Price (₹)</Label>
                            <Input 
                              type="number" 
                              placeholder="Optional"
                              value={formData.early_bird_price} 
                              onChange={(e) => setFormData({ ...formData, early_bird_price: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Early Bird Seats</Label>
                            <Input 
                              type="number" 
                              placeholder="Number of seats at early bird price"
                              value={formData.early_bird_seats} 
                              onChange={(e) => setFormData({ ...formData, early_bird_seats: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
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
                  <Button type="submit" className="w-full" disabled={submitting || uploading}>
                    {(submitting || uploading) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingSprint ? 'Update Sprint' : 'Create Sprint'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {sprints.map((sprint) => (
              <Card key={sprint.id} className="bg-card border-border overflow-hidden">
                <CardContent className="p-0 flex">
                  {sprint.cover_image_url && (
                    <div className="w-32 h-24 flex-shrink-0">
                      <img src={sprint.cover_image_url} alt={sprint.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={sprint.sprint_type === 'design' ? 'default' : 'secondary'}>{sprint.sprint_type}</Badge>
                        {!sprint.is_active && <Badge variant="outline">Inactive</Badge>}
                        {sprint.is_accepting_applications && <Badge variant="outline" className="text-primary border-primary">Open</Badge>}
                        {sprint.is_paid && <Badge variant="outline" className="text-green-500 border-green-500">₹{sprint.ticket_price}</Badge>}
                      </div>
                      <h3 className="text-lg font-semibold">{sprint.title}</h3>
                      <p className="text-sm text-muted-foreground">{sprint.duration_days} days • Max {sprint.max_participants} participants</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(sprint)}><Edit2 className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteSprint(sprint.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
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
