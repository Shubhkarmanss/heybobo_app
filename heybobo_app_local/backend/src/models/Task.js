import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    time: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
