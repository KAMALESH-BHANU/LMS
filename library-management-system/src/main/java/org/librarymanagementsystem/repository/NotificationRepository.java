package org.librarymanagementsystem.repository;

import org.librarymanagementsystem.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByMember_IdOrderByCreatedAtDesc(Long memberId);

    List<Notification> findByMember_IdAndSeenFalse(Long memberId);

}