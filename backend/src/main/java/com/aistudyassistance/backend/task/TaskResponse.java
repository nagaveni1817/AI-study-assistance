package com.aistudyassistance.backend.task;

import java.time.OffsetDateTime;

public record TaskResponse(Long id, String title, boolean completed, OffsetDateTime createdAt) {
	static TaskResponse from(Task task) {
		return new TaskResponse(task.getId(), task.getTitle(), task.isCompleted(), task.getCreatedAt());
	}
}
