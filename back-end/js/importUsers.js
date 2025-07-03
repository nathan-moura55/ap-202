import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Carrega variáveis de ambiente do .env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Por favor defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
  process.exit(1);
}

// Cliente Supabase com privilégios de administração
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

// Lista de usuários a importar
const newUsers = [
  { email: 'nathan@gmail.com', password: 'redwolf1020' },
  { email: 'pedro@gmail.com', password: 'galo123' },
  { email: 'milhouse@gmail.com', password: 'esqueca123' }
];

async function importUsers() {
  for (const user of newUsers) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true
      });
      if (error) throw error;
      console.log(`Usuário criado:`, data);
    } catch (err) {
      console.error(`Erro ao criar ${user.email}:`, err.message);
    }
  }
}

importUsers();
