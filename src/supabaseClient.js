import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bkxqznxucglmthlqtlyy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJreHF6bnh1Y2dsbXRobHF0bHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTM3NzksImV4cCI6MjA3Nzg4OTc3OX0.Q5shjn6_5Eud4DJp55N9kdL1Vz82tj_KTZZ8Ko-ZwZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
