package org.librarymanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    private LocalDate dob;

    @Column(nullable = false)
    private String role;
    private String gender;
    private String maritalStatus;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Boolean firstLogin = true;

    @Column(nullable = false)
    private Boolean active = true;


    @Builder.Default
    @Column(name = "approved_status", nullable = false)
    private String approvalStatus = "PENDING";

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    // Store uploaded document path or filename
    private String documentPath;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Address address;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Academic academic;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Work> works = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    @JsonBackReference
    private Member member;
}
