import { supabase } from './supabaseClient.js'

(async () => {
  const user = supabase.auth.user()
  if (!user) window.location.href = '../../../index.html'
})()