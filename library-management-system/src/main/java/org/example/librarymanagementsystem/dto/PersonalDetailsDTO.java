package org.example.librarymanagementsystem.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class PersonalDetailsDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @NotNull(message = "Date of birth is required")
    private LocalDate dob;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Marital status is required")
    private String maritalStatus;

    public PersonalDetailsDTO(LocalDate dob, String email, String firstName, String gender, String lastName, String maritalStatus, String phone, String role) {
        this.dob = dob;
        this.email = email;
        this.firstName = firstName;
        this.gender = gender;
        this.lastName = lastName;
        this.maritalStatus = maritalStatus;
        this.phone = phone;
        this.role = role;
    }


    //    public LocalDate getDob() {
//        return dob;
//    }
//
//    public void setDob(LocalDate dob) {
//        this.dob = dob;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getGender() {
//        return gender;
//    }
//
//    public void setGender(String gender) {
//        this.gender = gender;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getMaritalStatus() {
//        return maritalStatus;
//    }
//
//    public void setMaritalStatus(String maritalStatus) {
//        this.maritalStatus = maritalStatus;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }

}

