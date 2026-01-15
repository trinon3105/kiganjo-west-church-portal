-- Create ministry type enum
CREATE TYPE public.ministry_type AS ENUM ('youth', 'worship', 'men', 'women');

-- Create ministry registrations table
CREATE TABLE public.ministry_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ministry ministry_type NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, ministry)
);

-- Create ministry events table
CREATE TABLE public.ministry_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ministry ministry_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ministry_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for ministry_registrations
CREATE POLICY "Users can view their own registrations"
  ON public.ministry_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for ministries"
  ON public.ministry_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations"
  ON public.ministry_registrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own registrations"
  ON public.ministry_registrations FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for ministry_events (public read for registered users)
CREATE POLICY "Authenticated users can view events"
  ON public.ministry_events FOR SELECT
  TO authenticated
  USING (true);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.ministry_registrations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ministry_events;

-- Add trigger for updated_at on ministry_events
CREATE TRIGGER update_ministry_events_updated_at
  BEFORE UPDATE ON public.ministry_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();