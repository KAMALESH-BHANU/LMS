package org.librarymanagementsystem.service;

import lombok.RequiredArgsConstructor;
import org.librarymanagementsystem.model.Member;
import org.librarymanagementsystem.model.Notification;
import org.librarymanagementsystem.repository.MemberRepository;
import org.librarymanagementsystem.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;
    private final MemberRepository memberRepository;

    /*
     CREATE NOTIFICATION
    */
    public void createNotification(Long memberId, String title, String message) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Notification notification = Notification.builder()
                .member(member)
                .title(title)
                .message(message)
                .seen(false)
                .build();

        repository.save(notification);
    }

    /*
     GET ALL NOTIFICATIONS
    */
    public List<Notification> getUserNotifications(Long memberId) {

        return repository.findByMember_IdOrderByCreatedAtDesc(memberId);
    }

    /*
     GET UNREAD NOTIFICATIONS
    */
    public List<Notification> getUnreadNotifications(Long memberId) {

        return repository.findByMember_IdAndSeenFalse(memberId);
    }

    /*
     MARK AS SEEN
    */
    public void markAsSeen(Long id) {

        Notification notification = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setSeen(true);

        repository.save(notification);
    }

}