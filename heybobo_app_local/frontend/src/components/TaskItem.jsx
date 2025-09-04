export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between card">
      <div className="flex items-center gap-3">
        {/* Checkbox toggles strike-through */}
        <input
          type="checkbox"
          checked={task.status === 'Completed'}
          onChange={() => onToggle(task)}
        />

        <div>
          <div
            className={`font-semibold ${
              task.status === 'Completed' ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </div>
          <div className="text-xs opacity-70">
            {new Date(task.time).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Delete only when clicked */}
      <button
        className="btn bg-rose-100"
        onClick={() => onDelete(task._id)}
      >
        Delete
      </button>
    </div>
  );
}
