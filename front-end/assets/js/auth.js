// front-end/js/auth.js (versão ajustada para Supabase JS v2 UMD)

// Certifique-se de que o SDK UMD foi carregado e supabase inicializado globalmente
console.log('auth.js carregado');

const form = document.getElementById('login-form');
console.log('form encontrado?', form);

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('submit capturado');

    const email = form.email.value.trim();
    const password = form.password.value;
    console.log({ email, password });

    try {
      // Usar a nova API v2: signInWithPassword
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log({ data, error });
      if (error || !data.session) {
        alert('Falha no login: ' + (error?.message || 'Credenciais inválidas'));
      } else {
        console.log('Login bem-sucedido, redirecionando...');
        window.location.href = '/formulario.html';
      }
    } catch (err) {
      console.error('Erro no try:', err);
      alert('Erro inesperado: ' + err.message);
    }
  });
} else {
  console.error('Não foi possível encontrar o formulário de login na página.');
}
