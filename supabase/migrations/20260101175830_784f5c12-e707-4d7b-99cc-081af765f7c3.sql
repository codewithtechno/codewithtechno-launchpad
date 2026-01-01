-- Add CHECK constraints to enforce valid URL patterns (http:// or https:// only)

-- Constraint for applications.portfolio_link
ALTER TABLE public.applications 
ADD CONSTRAINT valid_portfolio_link 
CHECK (portfolio_link IS NULL OR portfolio_link ~ '^https?://');

-- Constraint for profiles.portfolio_url
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_portfolio_url 
CHECK (portfolio_url IS NULL OR portfolio_url ~ '^https?://');

-- Constraint for profiles.linkedin_url
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_linkedin_url 
CHECK (linkedin_url IS NULL OR linkedin_url ~ '^https?://');

-- Constraint for profiles.github_url
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_github_url 
CHECK (github_url IS NULL OR github_url ~ '^https?://');