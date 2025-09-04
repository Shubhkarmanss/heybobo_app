import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setAuth } from '../api';

export default function Login() {
  const nav = useNavigate();
  const [form, set] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      setAuth(data.token);
      nav('/');
    } catch (e) { setErr('Invalid credentials'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {err && <div className="text-red-500 text-sm">{err}</div>}
        <input className="input" placeholder="Email" value={form.email} onChange={e=>set(v=>({...v,email:e.target.value}))} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>set(v=>({...v,password:e.target.value}))} />
        <button className="btn bg-blue-200 w-full">Login</button>
        <div className="text-sm">No account? <Link to="/signup" className="underline">Sign up</Link></div>
      </form>
    </div>
  );
}
