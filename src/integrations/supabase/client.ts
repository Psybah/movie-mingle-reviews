// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iyzfyysslpaimrmqiunc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5emZ5eXNzbHBhaW1ybXFpdW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzI3NTYsImV4cCI6MjA0OTc0ODc1Nn0.PrbJmFYs0eo7BUp_vxjrn3nfF-AdXqimqFi34ghwh7c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);