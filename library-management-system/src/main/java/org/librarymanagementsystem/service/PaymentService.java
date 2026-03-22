package org.librarymanagementsystem.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.model.Payment;
import org.librarymanagementsystem.repository.IssueRepository;
import org.librarymanagementsystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private PaymentRepository paymentRepository;
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    /* ✅ CALCULATE TOTAL FINE */

    public double calculateFine(Long memberId) {

        List<Issue> issues = issueRepository.findByMemberId(memberId);
        double totalFine = 0;

        for (Issue issue : issues) {

            if (issue.getPenalty() != null && issue.getPenalty() > 0) {
                totalFine += issue.getPenalty();
            }

            if ("ISSUED".equals(issue.getStatus()) && issue.getDueDate() != null) {

                LocalDateTime dueDateTime = issue.getDueDate().atStartOfDay();

                if (LocalDateTime.now().isAfter(dueDateTime)) {
                    long daysLate = Duration.between(dueDateTime, LocalDateTime.now()).toDays();
                    totalFine += daysLate * 10;
                }
            }
        }

        return totalFine;
    }

    /* ✅ NEW: CREATE STRIPE CHECKOUT SESSION */

    public String createCheckoutSession(Long memberId) throws Exception {

        Stripe.apiKey =stripeSecretKey;
        System.out.println("Stripe Key Loaded: " + stripeSecretKey);

        double fine = calculateFine(memberId);

        if (fine <= 0) {
            throw new RuntimeException("No fine to pay");
        }

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:5173/student/payment-success?memberId=" + memberId)
                        .setCancelUrl("http://localhost:5173/payment-cancel")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount((long) (fine * 100)) // paise
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Library Fine Payment")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .putMetadata("memberId", memberId.toString())
                        .build();

        Session session = Session.create(params);

        return session.getUrl(); // ✅ Stripe hosted URL
    }

    /* ✅ CONFIRM PAYMENT */

    public Payment confirmPayment(String paymentIntentId, Long memberId) {

        double totalFine = calculateFine(memberId);
        double fine = calculateFine(memberId);

// ✅ FIX: Stripe minimum amount
        if (fine < 50) {
            fine = 50;
        }
        List<Issue> issues = issueRepository.findByMemberId(memberId);

        for (Issue issue : issues) {

            if (issue.getPenalty() != null && issue.getPenalty() > 0) {
                issue.setPenalty(0.0);
            }

            if ("ISSUED".equals(issue.getStatus())) {
                issue.setStatus("RETURNED");
            }
        }

        issueRepository.saveAll(issues);

        Payment payment = new Payment();
        payment.setMemberId(memberId);
        payment.setAmount(totalFine);
        payment.setStripePaymentIntentId(paymentIntentId);
        payment.setStatus("SUCCESS");
        payment.setDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }

    /* ✅ PAYMENT HISTORY */

    public List<Payment> getPayments(Long memberId) {
        return paymentRepository.findByMemberId(memberId);
    }
}