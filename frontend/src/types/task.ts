export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export interface CreateTaskInput {
  title: string
}
