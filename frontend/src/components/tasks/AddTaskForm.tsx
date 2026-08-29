import { useState, type FormEvent } from 'react'

interface AddTaskFormProps {
  onAdd: (title: string) => Promise<void>
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return setError('Add a task to continue.')
    if (trimmedTitle.length > 255) return setError('Keep the task under 255 characters.')
    setSubmitting(true)
    setError('')
    try {
      await onAdd(trimmedTitle)
      setTitle('')
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Could not add this task.')
    } finally {
      setSubmitting(false)
    }
  }

  return <form className="add-form" onSubmit={handleSubmit}>
    <input aria-label="New task" value={title} maxLength={255} onChange={(event) => setTitle(event.target.value)} placeholder="What do you want to accomplish today?" />
    <button className="add-button" type="submit" disabled={submitting} aria-label="Add task">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
    </button>
    {error && <span className="form-error" role="alert">{error}</span>}
  </form>
}
