package org.librarymanagementsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;   // Basic, Premium, Student etc

    private Integer durationInMonths;  // 0 = unlimited
    private Double price;              // 0 = free
}