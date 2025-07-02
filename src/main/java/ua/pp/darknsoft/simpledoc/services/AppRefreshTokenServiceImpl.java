package ua.pp.darknsoft.simpledoc.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.entities.security.AppRefreshToken;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.repositories.AppRefreshTokenRepository;

import java.util.Optional;

@Service
@Transactional
public class AppRefreshTokenServiceImpl implements AppRefreshTokenService{
    private final AppRefreshTokenRepository appRefreshTokenRepository;

    public AppRefreshTokenServiceImpl(AppRefreshTokenRepository appRefreshTokenRepository) {
        this.appRefreshTokenRepository = appRefreshTokenRepository;
    }

    @Override
    public AppRefreshToken save(AppRefreshToken dto) {
        AppUser appUser = dto.getAppUser();
        if( appRefreshTokenRepository.findAppRefreshTokenByAppUser(appUser).isPresent()){
            AppRefreshToken persistent = appRefreshTokenRepository.findAppRefreshTokenByAppUser(appUser).get();
            persistent.setRefreshToken(dto.getRefreshToken());
            return appRefreshTokenRepository.save(persistent);
        }

        return appRefreshTokenRepository.save(dto);
    }

    @Override
    public void deleteByUserId(AppUser appUser) {
        Optional<AppRefreshToken> persistentAppRefreshTokenOpt = appRefreshTokenRepository.findAppRefreshTokenByAppUser(appUser);
        persistentAppRefreshTokenOpt.ifPresent(appRefreshTokenRepository::delete);
    }

    @Override
    public boolean isOriginal(String refreshToken) {
        return appRefreshTokenRepository.findAppRefreshTokenByRefreshToken(refreshToken).isPresent();
    }
}
