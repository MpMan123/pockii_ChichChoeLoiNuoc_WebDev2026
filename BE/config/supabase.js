import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './env.js';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration. Make sure SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are set in your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
