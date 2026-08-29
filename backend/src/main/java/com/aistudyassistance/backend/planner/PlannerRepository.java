package com.aistudyassistance.backend.planner;
import java.time.LocalDate; import java.util.List; import org.springframework.data.jpa.repository.JpaRepository;
public interface PlannerRepository extends JpaRepository<ScheduledTask,Long>{ List<ScheduledTask> findByScheduledDateOrderByStartTimeAsc(LocalDate date); List<ScheduledTask> findByScheduledDateGreaterThanEqualOrderByScheduledDateAscStartTimeAsc(LocalDate date); }
