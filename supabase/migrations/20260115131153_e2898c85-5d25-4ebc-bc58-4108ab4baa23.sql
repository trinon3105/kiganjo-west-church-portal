-- Remove the overly permissive SELECT policy on profiles table
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;