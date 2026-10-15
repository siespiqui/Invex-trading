import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { Shell } from '@/components/Shell';
import api from '@/api';

export const Route = createFileRoute('/login')({
  component: LoginPagina,
});

function LoginPagina() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      // Petición al endpoint JWT de Django
      const res = await api.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });

      // Guardamos el token en localStorage
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('usuario_nombre', username);

      // Redirigimos al inicio
      navigate({ to: '/' });
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError('Usuario o contraseña incorrectos. Verifica tus credenciales.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <span className="text-4xl">🔐</span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Iniciar Sesión
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Ingresa tus credenciales para acceder a la plataforma de Invex Trading
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-xl border border-heat/40 bg-heat/10 p-3 text-xs text-heat text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300">
                Usuario
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: admin"
                className="mt-1.5 w-full rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-aurora focus:outline-none focus:ring-1 focus:ring-aurora"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-aurora focus:outline-none focus:ring-1 focus:ring-aurora"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-aurora to-mint px-4 py-3 font-display text-sm font-semibold text-ink transition enabled:hover:brightness-110 disabled:opacity-50"
            >
              {cargando ? 'Autenticando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </Shell>
  );
}