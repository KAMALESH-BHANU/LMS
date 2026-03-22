package org.librarymanagementsystem.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class ActivityResponse {
    private String action;
    private String time;
}