package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshTokenDTO {
    private Long tokenId;
    private AppUser appUser;
    private String refreshToken;
    private String ipAddress="172.0.0.1";
    private String browserFingerprint;
}
