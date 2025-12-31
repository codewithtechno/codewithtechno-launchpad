-- Fix the SECURITY DEFINER view warning by recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.user_applications;

CREATE VIEW public.user_applications 
WITH (security_invoker = true)
AS 
SELECT 
  id, 
  user_id, 
  sprint_id, 
  status, 
  motivation, 
  experience, 
  portfolio_link, 
  availability, 
  additional_info, 
  reviewed_at, 
  created_at, 
  updated_at
FROM public.applications;

-- Re-grant access to the view for authenticated users
GRANT SELECT ON public.user_applications TO authenticated;