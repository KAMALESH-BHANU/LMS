package org.example.librarymanagementsystem.dto;
import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;

import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
public class RegisterRequest {
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

//    @Valid
//    @NotNull(message = "Personal details are required")
//    private PersonalDetailsDTO personal;
//
//    @Valid
//    @NotNull(message = "Address details are required")
//    private AddressDTO address;
//
//    @Valid
//    @NotNull(message = "Academic details are required")
//    private AcademicDTO academic;
//
//    @Valid
//    private List<WorkDTO> works;
//    public AcademicDTO getAcademic() {
//        return academic;
//    }
//
//    public void setAcademic(AcademicDTO academic) {
//        this.academic = academic;
//    }
//
//    public AddressDTO getAddress() {
//        return address;
//    }
//
//    public void setAddress(AddressDTO address) {
//        this.address = address;
//    }
//
//    public PersonalDetailsDTO getPersonal() {
//        return personal;
//    }
//
//    public void setPersonal(PersonalDetailsDTO personal) {
//        this.personal = personal;
//    }
//
//    public List<WorkDTO> getWorks() {
//        return works;
//    }
//
//    public void setWorks(List<WorkDTO> works) {
//        this.works = works;
//    }
}
