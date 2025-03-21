import { createClient } from '@supabase/supabase-js'

const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dnpmdHFkd2pnanh3aGZsYXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDQyMTIsImV4cCI6MjA1ODAyMDIxMn0.N99XL2aVtSjvyGhuN_YLbAQIpBDUK4KdDu7PYJU53XA'
const supabase_url = 'https://ivvzftqdwjgjxwhflatg.supabase.co'

export const supabase = createClient(supabase_url, anon_key)

