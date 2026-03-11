package org.librarymanagementsystem.service;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.model.Notification;
import org.librarymanagementsystem.model.User;
import org.librarymanagementsystem.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    public void createNotification(User user, String title, String message) {

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .seen(false)
                .build();

        repository.save(notification);
    }

    public List<Notification> getUserNotifications(Long userId) {

        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsSeen(Long notificationId) {

        Notification notification = repository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setSeen(true);

        repository.save(notification);
    }

}