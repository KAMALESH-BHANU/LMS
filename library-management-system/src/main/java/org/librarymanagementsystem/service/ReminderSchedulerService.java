package org.librarymanagementsystem.service;

import org.librarymanagementsystem.model.Issue;
import org.librarymanagementsystem.repository.IssueRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReminderSchedulerService {

    private final IssueRepository issueRepository;
    private final EmailService emailService;

    public ReminderSchedulerService(IssueRepository issueRepository,
                                    EmailService emailService) {
        this.issueRepository = issueRepository;
        this.emailService = emailService;
    }

    /*
        Runs every day at 9:00 AM
    */
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendBookReminders() {

        List<Issue> issues = issueRepository.findAll();

        for (Issue issue : issues) {

            if (issue.getReturnDate() != null) {
                continue;
            }

            LocalDate today = LocalDate.now();
            LocalDate dueDate = issue.getDueDate();

            String email = issue.getMember().getUser().getEmail();
            String name = issue.getMember().getUser().getFirstName();
            String bookTitle = issue.getBook().getTitle();

            long daysUntilDue = ChronoUnit.DAYS.between(today, dueDate);
            long daysOverdue = ChronoUnit.DAYS.between(dueDate, today);

            /*
              3 DAYS BEFORE DUE DATE
            */
            if (daysUntilDue == 3) {

                try {

                    emailService.sendDueReminderEmail(
                            email,
                            name,
                            bookTitle,
                            dueDate.toString()
                    );

                } catch (Exception e) {

                    System.out.println("Due reminder email failed: " + e.getMessage());

                }
            }

            /*
              DUE TODAY
            */
            if (daysUntilDue == 0) {

                try {

                    emailService.sendDueReminderEmail(
                            email,
                            name,
                            bookTitle,
                            dueDate.toString()
                    );

                } catch (Exception e) {

                    System.out.println("Due today email failed: " + e.getMessage());

                }
            }

            /*
              OVERDUE PENALTY REMINDER
              Email every 5 days
            */
            if (daysOverdue > 0 && daysOverdue % 5 == 0) {

                int penaltyAmount = (int) (daysOverdue * 10);

                try {

                    emailService.sendPenaltyEmail(
                            email,
                            name,
                            bookTitle,
                            (int) daysOverdue,
                            penaltyAmount
                    );

                } catch (Exception e) {

                    System.out.println("Penalty reminder email failed: " + e.getMessage());

                }
            }

        }

    }

}