package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.entities.security.AppRefreshToken;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

public interface AppRefreshTokenService {
    AppRefreshToken save(AppRefreshToken dto);
    void deleteByUserId(AppUser appUser);

    boolean isOriginal(String refreshToken);
}
