package org.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.model.Notification;
import org.librarymanagementsystem.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    /*
     GET ALL NOTIFICATIONS
    */
    @GetMapping("/member/{memberId}")
    public List<Notification> getNotifications(@PathVariable Long memberId) {
        return notificationService.getUserNotifications(memberId);
    }

    /*
     GET UNREAD NOTIFICATIONS
    */
    @GetMapping("/unread/{memberId}")
    public List<Notification> getUnreadNotifications(@PathVariable Long memberId) {
        return notificationService.getUnreadNotifications(memberId);
    }

    /*
     MARK AS SEEN
    */
    @PutMapping("/seen/{id}")
    public void markAsSeen(@PathVariable Long id) {
        notificationService.markAsSeen(id);
    }

}