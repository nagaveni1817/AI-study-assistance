package com.aistudyassistance.backend.task;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskService {
	private final TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	@Transactional(readOnly = true)
	public List<TaskResponse> list() {
		return taskRepository.findAllByOrderByCreatedAtDesc().stream().map(TaskResponse::from).toList();
	}

	public TaskResponse create(CreateTaskRequest request) {
		return TaskResponse.from(taskRepository.save(new Task(request.title().trim())));
	}

	public TaskResponse toggle(Long id) {
		Task task = find(id);
		task.toggle();
		return TaskResponse.from(task);
	}

	public void delete(Long id) {
		taskRepository.delete(find(id));
	}

	private Task find(Long id) {
		return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
	}
}
