import { useEffect, useMemo, useRef, useState } from 'react'
import { AddTaskForm } from '../components/tasks/AddTaskForm'
import { TaskCard } from '../components/tasks/TaskCard'
import { useTheme, type Theme } from '../contexts/ThemeContext'
import { taskService } from '../services/taskService'
import type { Task } from '../types/task'

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀' }, { value: 'dark', label: 'Dark', icon: '☾' }, { value: 'system', label: 'System', icon: '◐' },
]

export function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [themeOpen, setThemeOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    taskService.list().then(setTasks).catch((exception: unknown) => setError(exception instanceof Error ? exception.message : 'Unable to load tasks.')).finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!menuRef.current?.contains(event.target as Node)) setThemeOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const completed = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
  const date = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

  async function addTask(title: string) { const task = await taskService.create({ title }); setTasks((current) => [task, ...current]); }
  async function toggleTask(task: Task) { try { const updated = await taskService.toggle(task.id); setTasks((current) => current.map((item) => item.id === task.id ? updated : item)); } catch { setError('Could not update that task. Please try again.') } }
  async function deleteTask(task: Task) { try { await taskService.remove(task.id); setTasks((current) => current.filter((item) => item.id !== task.id)); } catch { setError('Could not delete that task. Please try again.') } }

  return <main className="task-page"><section className="workspace" aria-label="Eva's task manager">
    <header className="workspace-head"><div><p className="eyebrow">Eva’s space</p><h1>Today</h1><p className="date-line">{date}</p><p className="subtitle">Stay consistent, one task at a time.</p></div>
      <div className="header-actions"><div className="theme-control" ref={menuRef}><button className="icon-button" onClick={() => setThemeOpen((open) => !open)} aria-label="Change theme" aria-expanded={themeOpen}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3.4"/><path d="M12 2v2.1M12 19.9V22M4.93 4.93l1.49 1.49m11.16 11.16 1.49 1.49M2 12h2.1m15.8 0H22M4.93 19.07l1.49-1.49M17.58 6.42l1.49-1.49"/></svg></button>
        {themeOpen && <div className="theme-menu" role="menu">{themeOptions.map((option) => <button key={option.value} className={`theme-option ${theme === option.value ? 'active' : ''}`} onClick={() => { setTheme(option.value); setThemeOpen(false) }} role="menuitem"><span>{option.icon}</span>{option.label}</button>)}</div>}</div>
      <div className="progress" style={{ '--progress': progress } as React.CSSProperties}><div className="progress-inner"><span>{completed}/{tasks.length}</span><small>COMPLETE</small></div></div></div></header>
    <AddTaskForm onAdd={addTask} />
    {error && <p className="error-notice" role="alert">{error}</p>}
    {loading ? <p className="loading">Loading your day…</p> : tasks.length ? <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)}</div> : <div className="empty-state"><div className="empty-icon"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 11.5 11.2 14 15.5 9"/><rect x="4" y="3" width="16" height="18" rx="4"/><path d="M8 3v3m8-3v3"/></svg></div><h2>Nothing planned yet</h2><p>A clear day is a canvas. Add your first intention.</p></div>}
  </section></main>
}
