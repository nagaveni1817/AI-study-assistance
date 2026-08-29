package com.aistudyassistance.backend.planner;
import java.time.*; import java.util.*; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import jakarta.validation.Valid; import com.aistudyassistance.backend.task.*;
@RestController @RequestMapping("/api/planner") public class PlannerController { private final PlannerRepository schedules; private final TaskRepository tasks; public PlannerController(PlannerRepository s,TaskRepository t){schedules=s;tasks=t;}
 @GetMapping public List<PlannerResponse> list(@RequestParam LocalDate date){return schedules.findByScheduledDateOrderByStartTimeAsc(date).stream().map(PlannerResponse::from).toList();}
 @GetMapping("/upcoming") public List<PlannerResponse> upcoming(@RequestParam LocalDate from){return schedules.findByScheduledDateGreaterThanEqualOrderByScheduledDateAscStartTimeAsc(from).stream().map(PlannerResponse::from).toList();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public PlannerResponse create(@Valid @RequestBody PlannerRequest r){Task t=tasks.findById(r.taskId()).orElseThrow(()->new TaskNotFoundException(r.taskId())); return PlannerResponse.from(schedules.save(new ScheduledTask(t,r.scheduledDate(),r.startTime(),r.durationMinutes())));}
 @PutMapping("/{id}") public PlannerResponse update(@PathVariable Long id,@Valid @RequestBody PlannerRequest r){ScheduledTask s=schedules.findById(id).orElseThrow(()->new NoSuchElementException("Scheduled task not found")); s.update(r.scheduledDate(),r.startTime(),r.durationMinutes());return PlannerResponse.from(schedules.save(s));}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){schedules.deleteById(id);}
}
