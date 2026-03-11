package org.librarymanagementsystem.dto;

import lombok.Data;

@Data
public class IssueBookRequestDTO {

    private Long memberId;
    private Long bookId;
}
