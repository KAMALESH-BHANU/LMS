package org.example.librarymanagementsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "work_experience")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String designation;

    private Boolean currentlyWorking;

    private LocalDate startDate;
    private LocalDate endDate;

    private Double ctc;

    @Column(length = 1000)
    private String reasonForLeaving;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    public String getCompanyName() {
//        return companyName;
//    }
//
//    public void setCompanyName(String companyName) {
//        this.companyName = companyName;
//    }
//
//    public Double getCtc() {
//        return ctc;
//    }
//
//    public void setCtc(Double ctc) {
//        this.ctc = ctc;
//    }
//
//    public Boolean getCurrentlyWorking() {
//        return currentlyWorking;
//    }
//
//    public void setCurrentlyWorking(Boolean currentlyWorking) {
//        this.currentlyWorking = currentlyWorking;
//    }
//
//    public String getDesignation() {
//        return designation;
//    }
//
//    public void setDesignation(String designation) {
//        this.designation = designation;
//    }
//
//    public LocalDate getEndDate() {
//        return endDate;
//    }
//
//    public void setEndDate(LocalDate endDate) {
//        this.endDate = endDate;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getReasonForLeaving() {
//        return reasonForLeaving;
//    }
//
//    public void setReasonForLeaving(String reasonForLeaving) {
//        this.reasonForLeaving = reasonForLeaving;
//    }
//
//    public LocalDate getStartDate() {
//        return startDate;
//    }
//
//    public void setStartDate(LocalDate startDate) {
//        this.startDate = startDate;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
}
