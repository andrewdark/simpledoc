package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.security.AppRefreshToken;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

import java.util.Optional;

public interface AppRefreshTokenRepository extends JpaRepository<AppRefreshToken, Long> {
    Optional<AppRefreshToken> findAppRefreshTokenByAppUser(AppUser appUser);
    Optional<AppRefreshToken> findAppRefreshTokenByRefreshToken(String refreshToken);
}
