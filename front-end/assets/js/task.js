import { supabase } from './supabaseClient.js'

// Elemento onde renderiza as tarefas
const listEl = document.getElementById('tasks-list')

// Carrega e desenha as tasks do usuário
export async function loadTasks() {
  const user = supabase.auth.user()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('inserted_at', { ascending: true })

  if (error) return console.error(error)

  listEl.innerHTML = data.map(t => `
    <div class="tarefa" data-id="${t.id}">
      <h3>${t.title}</h3>
      <p>${t.day_of_week} — ${t.status}</p>
    </div>
  `).join('')
}

// Insere nova task
export async function addTask({ title, task_date, day_of_week, status }) {
  const user = supabase.auth.user()
  const { error } = await supabase
    .from('tasks')
    .insert([{ user_id: user.id, title, task_date, day_of_week, status }])
  if (error) console.error(error); else loadTasks()
}

// Atualiza e deleta seguem o mesmo padrão (usar .update/.delete)

// Real‑time para recarregar automaticamente
supabase
  .from(`tasks:user_id=eq.${supabase.auth.user().id}`)
  .on('*', () => loadTasks())
  .subscribe()

// Chama na inicialização
loadTasks()