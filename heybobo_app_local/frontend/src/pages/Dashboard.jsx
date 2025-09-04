import { useEffect, useMemo, useState } from 'react';
import { api, setAuth } from '../api';
import TaskItem from '../components/TaskItem';
import WeatherCard from '../components/WeatherCard';
import QuickButtons from '../components/QuickButtons';

export default function Dashboard() {
  const name = localStorage.getItem('name') || 'Friend';
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(token);
    api.get('/tasks').then(({ data }) => setTasks(data)).finally(() => setLoading(false));
  }, []);

  async function addTask() {
    if (!text.trim()) return;
    const payload = { title: text, time: new Date(Date.now() + 60*60*1000), status: 'Pending' };
    const { data } = await api.post('/tasks', payload);
    setTasks(t => [ ...t, data ]);
    setText('');
  }

  async function toggleTask(task) {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
    setTasks(ts => ts.map(t => t._id === task._id ? data : t));
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    setTasks(ts => ts.filter(t => t._id !== id));
  }

  const pending = useMemo(() => tasks.filter(t => t.status === 'Pending'), [tasks]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold">Good morning, {name}</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚠️</span>
                <h2 className="font-bold text-xl">Pending tasks</h2>
              </div>
              <div className="space-y-2">
                {loading ? (
                  <div>Loading...</div>
                ) : pending.length ? (
                  pending.map(t => (
                    <TaskItem key={t._id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
                  ))
                ) : (
                  <div className="text-sm opacity-70">No pending tasks</div>
                )}
              </div>
            </div>
          </div>

          <WeatherCard city="Delhi" />
        </div>

        <div className="flex items-center gap-2 card">
          <input className="input" placeholder="Hey Bobo, remind me to..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter' && addTask()} />
          <button className="btn bg-blue-200" onClick={addTask}>Add</button>
        </div>

        <QuickButtons />
      </div>
    </div>
  );
}
