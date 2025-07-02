package ua.pp.darknsoft.simpledoc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponseDTO {
    private Long userId;
    private AppUserDTO user;
    private String accessToken;
    private String refreshToken;
}
