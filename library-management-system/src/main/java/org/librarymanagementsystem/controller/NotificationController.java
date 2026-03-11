package org.librarymanagementsystem.controller;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.model.Notification;
import org.librarymanagementsystem.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {

        return notificationService.getUserNotifications(userId);
    }

    @PutMapping("/seen/{id}")
    public void markAsSeen(@PathVariable Long id) {

        notificationService.markAsSeen(id);
    }

}