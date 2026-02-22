import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rseiyhaaerboxxympfnq.supabase.co'
const supabaseAnonKey = 'sb_publishable_vsbdR0X-7BlXvuXp21iM4Q_fy_sFyK5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
