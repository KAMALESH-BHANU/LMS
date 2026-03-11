package org.librarymanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonManagedReference
    private User user;

    private LocalDate membershipStart;
    private LocalDate membershipExpiry;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private MembershipPlan plan;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Issue> borrowings;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<BookRequest> bookRequests;
}