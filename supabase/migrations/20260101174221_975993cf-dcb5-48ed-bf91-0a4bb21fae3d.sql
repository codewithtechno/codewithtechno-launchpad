-- Add paid sprint columns to sprints table
ALTER TABLE public.sprints 
ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS ticket_price decimal(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS early_bird_price decimal(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS early_bird_seats integer DEFAULT NULL;

-- Add payment tracking columns to applications table
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS payment_id text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS payment_amount decimal(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone DEFAULT NULL;

-- Create storage bucket for sprint cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('sprint-covers', 'sprint-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view cover images (public bucket)
CREATE POLICY "Anyone can view sprint cover images"
ON storage.objects FOR SELECT
USING (bucket_id = 'sprint-covers');

-- Allow admins to upload cover images
CREATE POLICY "Admins can upload sprint cover images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'sprint-covers' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update cover images
CREATE POLICY "Admins can update sprint cover images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'sprint-covers' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete cover images
CREATE POLICY "Admins can delete sprint cover images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'sprint-covers' 
  AND public.has_role(auth.uid(), 'admin')
);