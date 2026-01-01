import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useEvents, Event } from '@/hooks/useEvents';
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
import { Plus, Edit2, Trash2, Loader2, Upload, X, Image as ImageIcon, MapPin, Calendar, Clock, Wifi, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManageEvents = () => {
  const { user } = useAuth();
  const { events, loading, createEvent, updateEvent, deleteEvent } = useEvents();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'online' as 'online' | 'offline',
    event_date: '',
    event_time: '',
    location: '',
    max_participants: 100,
    is_active: true,
    is_accepting_registrations: true,
    is_paid: false,
    ticket_price: '',
    early_bird_price: '',
    early_bird_seats: '',
    cover_image_url: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: 'online',
      event_date: '',
      event_time: '',
      location: '',
      max_participants: 100,
      is_active: true,
      is_accepting_registrations: true,
      is_paid: false,
      ticket_price: '',
      early_bird_price: '',
      early_bird_seats: '',
      cover_image_url: '',
    });
    setEditingEvent(null);
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
      .from('event-covers')
      .upload(fileName, imageFile);

    setUploading(false);

    if (error) {
      toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('event-covers')
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

    const eventData = {
      ...formData,
      created_by: user?.id,
      event_time: formData.event_time || null,
      location: formData.location || null,
      cover_image_url: coverImageUrl,
      ticket_price: formData.is_paid && formData.ticket_price ? parseFloat(formData.ticket_price) : null,
      early_bird_price: formData.is_paid && formData.early_bird_price ? parseFloat(formData.early_bird_price) : null,
      early_bird_seats: formData.is_paid && formData.early_bird_seats ? parseInt(formData.early_bird_seats) : null,
    };

    if (editingEvent) {
      await updateEvent(editingEvent.id, eventData);
    } else {
      await createEvent(eventData);
    }

    setSubmitting(false);
    setIsOpen(false);
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      event_type: event.event_type,
      event_date: event.event_date,
      event_time: event.event_time || '',
      location: event.location || '',
      max_participants: event.max_participants || 100,
      is_active: event.is_active,
      is_accepting_registrations: event.is_accepting_registrations,
      is_paid: event.is_paid || false,
      ticket_price: event.ticket_price?.toString() || '',
      early_bird_price: event.early_bird_price?.toString() || '',
      early_bird_seats: event.early_bird_seats?.toString() || '',
      cover_image_url: event.cover_image_url || '',
    });
    setImagePreview(event.cover_image_url || null);
    setIsOpen(true);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Events</h1>
            <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-2" />Create Event</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingEvent ? 'Edit Event' : 'Create Event'}</DialogTitle></DialogHeader>
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
                      <Label>Event Type *</Label>
                      <Select value={formData.event_type} onValueChange={(v) => setFormData({ ...formData, event_type: v as 'online' | 'offline' })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Max Participants</Label>
                      <Input type="number" value={formData.max_participants} onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Date *</Label>
                      <Input type="date" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Time</Label>
                      <Input type="time" value={formData.event_time} onChange={(e) => setFormData({ ...formData, event_time: e.target.value })} />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Location {formData.event_type === 'offline' ? '*' : '(URL for online events)'}</Label>
                      <Input 
                        value={formData.location} 
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                        placeholder={formData.event_type === 'online' ? 'Meeting URL' : 'Venue address'}
                        required={formData.event_type === 'offline'}
                      />
                    </div>

                    {/* Paid Event Section */}
                    <div className="col-span-2 border border-border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Paid Event</Label>
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
                              placeholder="e.g., 499"
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
                      <Switch checked={formData.is_accepting_registrations} onCheckedChange={(c) => setFormData({ ...formData, is_accepting_registrations: c })} />
                      <Label>Accepting Registrations</Label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting || uploading}>
                    {(submitting || uploading) ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : events.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                <p className="text-muted-foreground">Create your first event to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-card border-border overflow-hidden">
                  <CardContent className="p-0 flex">
                    {event.cover_image_url && (
                      <div className="w-32 h-28 flex-shrink-0">
                        <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant={event.event_type === 'online' ? 'default' : 'secondary'}>
                            {event.event_type === 'online' ? <Wifi className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                            {event.event_type}
                          </Badge>
                          {!event.is_active && <Badge variant="outline">Inactive</Badge>}
                          {event.is_accepting_registrations && <Badge variant="outline" className="text-primary border-primary">Open</Badge>}
                          {event.is_paid && <Badge variant="outline" className="text-green-500 border-green-500">₹{event.ticket_price}</Badge>}
                        </div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(event.event_date)}
                          </span>
                          {event.event_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.event_time}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Max {event.max_participants}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(event)}><Edit2 className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" onClick={() => deleteEvent(event.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManageEvents;
