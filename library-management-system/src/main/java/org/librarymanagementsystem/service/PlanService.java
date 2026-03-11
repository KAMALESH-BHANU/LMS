package org.librarymanagementsystem.service;

import org.librarymanagementsystem.model.MembershipPlan;
import org.librarymanagementsystem.repository.PlanRepository;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    // Create Default Basic Plan Automatically
    @PostConstruct
    public void createDefaultPlan() {
        if (planRepository.findByName("Basic").isEmpty()) {
            MembershipPlan basic = new MembershipPlan();
            basic.setName("Basic");
            basic.setDurationInMonths(0); // unlimited
            basic.setPrice(0.0);
            planRepository.save(basic);
        }
    }

    public MembershipPlan addPlan(MembershipPlan plan) {
        return planRepository.save(plan);
    }

    public List<MembershipPlan> getAllPlans() {
        return planRepository.findAll();
    }

    public MembershipPlan updatePlan(Long id, MembershipPlan updatedPlan) {
        MembershipPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        plan.setName(updatedPlan.getName());
        plan.setDurationInMonths(updatedPlan.getDurationInMonths());
        plan.setPrice(updatedPlan.getPrice());

        return planRepository.save(plan);
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}