import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-project.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
