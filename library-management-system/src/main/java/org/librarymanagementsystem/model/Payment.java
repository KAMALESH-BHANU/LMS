package org.librarymanagementsystem.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//public class Payment {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private double amount;
//
//    private String razorpayOrderId;
//
//    private String razorpayPaymentId;
//
//    private String razorpaySignature;
//
//    private LocalDateTime date;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//}

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity

@Getter
@Setter
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private Double amount;

    private String stripePaymentIntentId;

    private String status; // SUCCESS / FAILED

    private LocalDateTime date;
}