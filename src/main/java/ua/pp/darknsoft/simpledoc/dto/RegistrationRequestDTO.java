package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
