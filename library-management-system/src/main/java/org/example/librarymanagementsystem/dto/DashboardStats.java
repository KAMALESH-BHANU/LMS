package org.example.librarymanagementsystem.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class DashboardStats {
    private long totalMembers;
    private long totalBooks;
    private long issuedBooks;
    private long pendingApprovals;
    private long overdueBooks;
}
