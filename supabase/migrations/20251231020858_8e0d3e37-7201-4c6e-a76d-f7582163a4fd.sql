-- Fix 1: Create a view for user applications that excludes admin_notes
-- This prevents regular users from seeing admin comments on their applications
CREATE VIEW public.user_applications AS 
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

-- Grant access to the view for authenticated users
GRANT SELECT ON public.user_applications TO authenticated;

-- Fix 2: Create a trigger to prevent users from setting admin-only fields on INSERT
-- This ensures that status, admin_notes, reviewed_by, reviewed_at can only be set by admins
CREATE OR REPLACE FUNCTION public.enforce_application_insert_rules()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user is NOT an admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    -- Force safe values for admin-only fields
    NEW.status := 'pending';
    NEW.admin_notes := NULL;
    NEW.reviewed_by := NULL;
    NEW.reviewed_at := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger on the applications table
CREATE TRIGGER enforce_application_insert_rules_trigger
  BEFORE INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_application_insert_rules();

-- Fix 3: Also protect UPDATE operations - regular users should not be able to update admin fields
CREATE OR REPLACE FUNCTION public.enforce_application_update_rules()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user is NOT an admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    -- Preserve original values for admin-only fields
    NEW.status := OLD.status;
    NEW.admin_notes := OLD.admin_notes;
    NEW.reviewed_by := OLD.reviewed_by;
    NEW.reviewed_at := OLD.reviewed_at;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger for updates
CREATE TRIGGER enforce_application_update_rules_trigger
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_application_update_rules();