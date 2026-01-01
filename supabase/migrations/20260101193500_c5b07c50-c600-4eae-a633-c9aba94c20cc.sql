-- Create event_type enum
CREATE TYPE public.event_type AS ENUM ('online', 'offline');

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type public.event_type NOT NULL DEFAULT 'online',
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  cover_image_url TEXT,
  is_paid BOOLEAN DEFAULT false,
  ticket_price NUMERIC,
  early_bird_price NUMERIC,
  early_bird_seats INTEGER,
  max_participants INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  is_accepting_registrations BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT,
  payment_id TEXT,
  payment_amount NUMERIC,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS policies for events
CREATE POLICY "Anyone can view active events"
ON public.events
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage events"
ON public.events
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for event_registrations
CREATE POLICY "Users can view their own registrations"
ON public.event_registrations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations"
ON public.event_registrations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create registrations"
ON public.event_registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update registrations"
ON public.event_registrations
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for event covers
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-covers', 'event-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for event covers
CREATE POLICY "Anyone can view event covers"
ON storage.objects
FOR SELECT
USING (bucket_id = 'event-covers');

CREATE POLICY "Admins can upload event covers"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'event-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update event covers"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'event-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete event covers"
ON storage.objects
FOR DELETE
USING (bucket_id = 'event-covers' AND public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at
BEFORE UPDATE ON public.event_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();