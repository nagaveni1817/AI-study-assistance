import type { Task } from '../../types/task'

interface TaskCardProps {
  task: Task
  onToggle: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(task.createdAt))
  return <article className={`task-card ${task.completed ? 'completed' : ''}`}>
    <button className={`check-button ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task)} aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4.2 4.2L19 6.8" /></svg>
    </button>
    <div className="task-content"><p className="task-title">{task.title}</p><time className="task-time" dateTime={task.createdAt}>Added {time}</time></div>
    <button className="delete-button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6M14 10v6" /></svg>
    </button>
  </article>
}
