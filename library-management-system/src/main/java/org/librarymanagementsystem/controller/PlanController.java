package org.librarymanagementsystem.controller;

import org.librarymanagementsystem.model.MembershipPlan;
import org.librarymanagementsystem.service.PlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @PostMapping
    public MembershipPlan addPlan(@RequestBody MembershipPlan plan) {
        return planService.addPlan(plan);
    }

    @GetMapping
    public List<MembershipPlan> getPlans() {
        return planService.getAllPlans();
    }

    @PutMapping("/{id}")
    public MembershipPlan updatePlan(@PathVariable Long id,
                                     @RequestBody MembershipPlan plan) {
        return planService.updatePlan(id, plan);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
    }
}