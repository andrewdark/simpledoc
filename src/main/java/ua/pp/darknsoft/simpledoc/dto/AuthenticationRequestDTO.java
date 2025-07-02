package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequestDTO {
    private String email;
    private String password;
}
