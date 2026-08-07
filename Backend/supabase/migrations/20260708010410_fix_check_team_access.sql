-- Fix for check_team_access function: cast required_roles to text[] to match role which is TEXT
CREATE OR REPLACE FUNCTION public.check_team_access(t_id uuid, required_roles public.team_role[] DEFAULT ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = t_id 
    AND user_id = auth.uid() 
    AND role = ANY(required_roles::text[])
  );
END;
$function$;
