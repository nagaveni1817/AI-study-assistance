package com.aistudyassistance.backend.planner;
import java.time.*; import jakarta.validation.constraints.*;
public record PlannerRequest(@NotNull Long taskId,@NotNull LocalDate scheduledDate,@NotNull LocalTime startTime,@Min(1) @Max(1440) int durationMinutes){}
