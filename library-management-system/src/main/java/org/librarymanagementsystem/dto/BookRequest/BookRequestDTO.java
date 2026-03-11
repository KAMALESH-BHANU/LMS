package org.librarymanagementsystem.dto.BookRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter

public class BookRequestDTO {

    private Long id;
    private String requestedTitle;
    private String requestedAuthor;
    private String status;
    private String memberName;
    private String coverImage;
    private Long bookId;
    private String memberEmail;

}