package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberShipPlanRepository extends JpaRepository<MembershipPlan,Long> {
    MembershipPlan findByName(String name);
}
