//package org.librarymanagementsystem.controller;
//
//import org.librarymanagementsystem.model.Payment;
//import org.librarymanagementsystem.service.PaymentService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/payments")
//@CrossOrigin
//public class PaymentController {
//
//    private final PaymentService paymentService;
//
//    public PaymentController(PaymentService paymentService) {
//        this.paymentService = paymentService;
//    }
//
//    /* PAYMENT HISTORY */
//
//    @GetMapping
//    public List<Payment> getPayments(@RequestParam Long memberId) {
//        return paymentService.getPayments(memberId);
//    }
//
//    /* CREATE RAZORPAY ORDER */
//
//    @PostMapping("/create-order")
//    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data)
//            throws Exception {
//
//        double amount = Double.parseDouble(data.get("amount").toString());
//        Long memberId = Long.parseLong(data.get("memberId").toString());
//
//        return paymentService.createOrder(amount, memberId);
//    }
//
//    /* VERIFY PAYMENT */
//
//    @PostMapping("/verify")
//    public Payment verifyPayment(@RequestBody Map<String, Object> data) {
//
//        String orderId = data.get("razorpayOrderId").toString();
//        String paymentId = data.get("razorpayPaymentId").toString();
//        String signature = data.get("razorpaySignature").toString();
//
//        Long memberId = Long.parseLong(data.get("memberId").toString());
//        double amount = Double.parseDouble(data.get("amount").toString());
//
//        return paymentService.verifyPayment(
//                orderId,
//                paymentId,
//                signature,
//                memberId,
//                amount
//        );
//    }
//
//}
//package org.librarymanagementsystem.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.librarymanagementsystem.service.PaymentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/payments")
//@CrossOrigin("*")
//@RequiredArgsConstructor
//public class PaymentController {
//
//    @Autowired
//    private PaymentService paymentService;
//
//    /* CREATE STRIPE PAYMENT */
//
//    @PostMapping("/create-intent")
//    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> body) throws Exception {
//
//        Long memberId = Long.valueOf(body.get("memberId").toString());
//
//        Map<String, Object> response = paymentService.createPaymentIntent(memberId);
//
//        // ✅ Handle no fine case properly
//        if (response.containsKey("error")) {
//            return ResponseEntity.badRequest().body(response);
//        }
//
//        return ResponseEntity.ok(response);
//    }
//
//    /* CONFIRM PAYMENT */
//
//    @PostMapping("/confirm")
//    public ResponseEntity<?> confirm(@RequestBody Map<String, Object> body) {
//
//        String paymentIntentId = body.get("paymentIntentId").toString();
//        Long memberId = Long.valueOf(body.get("memberId").toString());
//
//        return ResponseEntity.ok(
//                paymentService.confirmPayment(paymentIntentId, memberId)
//        );
//    }
//
//    /* PAYMENT HISTORY (✅ FIXED ENDPOINT) */
//
//    @GetMapping("/member/{memberId}")
//    public ResponseEntity<?> history(@PathVariable Long memberId) {
//        return ResponseEntity.ok(
//                paymentService.getPayments(memberId)
//        );
//    }
//}
package org.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /* ✅ CREATE CHECKOUT SESSION */

    @PostMapping("/create-checkout-session/{memberId}")
    public ResponseEntity<?> createCheckout(@PathVariable Long memberId) {
        try {
            String url = paymentService.createCheckoutSession(memberId);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* ✅ CONFIRM PAYMENT */

    @PostMapping("/confirm/{memberId}")
    public ResponseEntity<?> confirm(@PathVariable Long memberId) {
        if (memberId == null) {
            throw new RuntimeException("Invalid member");
        }
        try {
            return ResponseEntity.ok(
                    paymentService.confirmPayment("stripe-session", memberId)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Payment confirmation failed");
        }
    }

    /* ✅ PAYMENT HISTORY */

    @GetMapping("/member/{memberId}")
    public ResponseEntity<?> history(@PathVariable Long memberId) {
        return ResponseEntity.ok(
                paymentService.getPayments(memberId)
        );
    }


}