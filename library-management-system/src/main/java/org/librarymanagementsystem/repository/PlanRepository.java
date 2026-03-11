package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<MembershipPlan, Long> {
    Optional<MembershipPlan> findByName(String name);
}