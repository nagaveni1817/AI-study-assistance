package com.aistudyassistance.backend.planner;
import java.time.*;
import com.aistudyassistance.backend.task.Task;
import jakarta.persistence.*;
@Entity @Table(name="scheduled_tasks") public class ScheduledTask {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(fetch=FetchType.LAZY, optional=false) @JoinColumn(name="task_id") private Task task;
 @Column(name="scheduled_date",nullable=false) private LocalDate scheduledDate;
 @Column(name="start_time",nullable=false) private LocalTime startTime;
 @Column(name="duration_minutes",nullable=false) private int durationMinutes;
 protected ScheduledTask(){} public ScheduledTask(Task task,LocalDate day,LocalTime time,int duration){this.task=task;scheduledDate=day;startTime=time;durationMinutes=duration;}
 public Long getId(){return id;} public Task getTask(){return task;} public LocalDate getScheduledDate(){return scheduledDate;} public LocalTime getStartTime(){return startTime;} public int getDurationMinutes(){return durationMinutes;}
 public void update(LocalDate day,LocalTime time,int duration){scheduledDate=day;startTime=time;durationMinutes=duration;}
}
