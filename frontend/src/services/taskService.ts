import type { CreateTaskInput, Task } from '../types/task'

// Use Vite's same-origin development proxy by default. This avoids a browser
// CORS preflight for JSON POST/PUT requests while still allowing deployments
// to supply an explicit backend URL.
const API_URL = (import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Something went wrong.' })) as { detail?: string }
    throw new Error(error.detail ?? 'Something went wrong.')
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const taskService = {
  list: () => request<Task[]>('/api/tasks'),
  create: (input: CreateTaskInput) => request<Task>('/api/tasks', { method: 'POST', body: JSON.stringify(input) }),
  toggle: (id: number) => request<Task>(`/api/tasks/${id}/toggle`, { method: 'PUT' }),
  remove: (id: number) => request<void>(`/api/tasks/${id}`, { method: 'DELETE' }),
}
