import { Router } from 'express';
import Task from '../models/Task.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// GET /tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ time: 1 });
  res.json(tasks);
});

// POST /tasks
router.post('/', auth, async (req, res) => {
  const { title, time, status } = req.body;
  if (!title) return res.status(400).json({ message: 'title required' });
  const t = await Task.create({ user: req.userId, title, time: time ? new Date(time) : new Date(Date.now() + 60*60*1000), status: status || 'Pending' });
  res.status(201).json(t);
});

// PUT /tasks/:id
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, time, status } = req.body;
  const updated = await Task.findOneAndUpdate(
    { _id: id, user: req.userId },
    { $set: { ...(title && { title }), ...(time && { time }), ...(status && { status }) } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Task not found' });
  res.json(updated);
});

// DELETE /tasks/:id
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const del = await Task.findOneAndDelete({ _id: id, user: req.userId });
  if (!del) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Deleted', id });
});

export default router;
