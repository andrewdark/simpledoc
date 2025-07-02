package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.security.AppUserToAppUserDTO;
import ua.pp.darknsoft.simpledoc.dto.AppUserDTO;
import ua.pp.darknsoft.simpledoc.dto.AuthenticationRequestDTO;
import ua.pp.darknsoft.simpledoc.dto.AuthenticationResponseDTO;
import ua.pp.darknsoft.simpledoc.dto.RegistrationRequestDTO;
import ua.pp.darknsoft.simpledoc.dto.security.UserDetailsImpl;
import ua.pp.darknsoft.simpledoc.entities.security.AppRefreshToken;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.utils.jwt.JwtUtils;

import java.util.Optional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AppUserService appUserService;
    private final AppRefreshTokenService appRefreshTokenService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder bCryptPasswordEncoder;

    private final AppUserToAppUserDTO toAppUserDTO;
    public AuthServiceImpl(AppUserService appUserService, AppRefreshTokenService appRefreshTokenService, JwtUtils jwtUtils, AuthenticationManager authenticationManager, PasswordEncoder bCryptPasswordEncoder, AppUserToAppUserDTO toAppUserDTO) {
        this.appUserService = appUserService;
        this.appRefreshTokenService = appRefreshTokenService;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.toAppUserDTO = toAppUserDTO;
    }

    @Override
    public AuthenticationResponseDTO registration(RegistrationRequestDTO responseDTO) {
        if (appUserService.findByUsername(responseDTO.getEmail().toLowerCase()).isPresent()) {
            return null;
        }

        responseDTO.setEmail(responseDTO.getEmail().toLowerCase());
        responseDTO.setPassword(bCryptPasswordEncoder.encode(responseDTO.getPassword()));
        AppUser appUser = appUserService.createAppUser(responseDTO);
        AppUserDTO appUserDTO = toAppUserDTO.convert(appUser);
        AuthenticationResponseDTO response = AuthenticationResponseDTO.builder()
                .userId(appUser.getId())
                .accessToken(jwtUtils.generateJwtAccessToken(appUser.getEmail()))
                .refreshToken(jwtUtils.generateJwtRefreshToken(appUser.getEmail()))
                .user(appUserDTO)
                .build();
        AppRefreshToken appRefreshToken = new AppRefreshToken();
        appRefreshToken.setRefreshToken((response.getRefreshToken()));
        appRefreshToken.setAppUser(appUser);
        appRefreshToken.setIpAddress("172.0.0.1");
        appRefreshToken.setBrowserFingerprint("NO-INFORMATION");
        appRefreshTokenService.save(appRefreshToken);

        return response;
    }

    @Override
    public AuthenticationResponseDTO authenticateUser(AuthenticationRequestDTO authenticationRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequestDTO.getEmail().toLowerCase(), authenticationRequestDTO.getPassword()));

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        AppUser appUser = appUserService.getReference(userDetails.getId());

        AppUserDTO appUserDTO = toAppUserDTO.convert(appUser);
        AuthenticationResponseDTO authenticationResponseDTO = AuthenticationResponseDTO.builder()
                .userId(userDetails.getId())
                .user(appUserDTO)
                .accessToken((jwtUtils.generateJwtAccessToken(userDetails.getUsername())))
                .refreshToken(jwtUtils.generateJwtRefreshToken(userDetails.getUsername()))
                .build();

        AppRefreshToken appRefreshToken = new AppRefreshToken();
        appRefreshToken.setRefreshToken((authenticationResponseDTO.getRefreshToken()));
        appRefreshToken.setAppUser(appUser);
        appRefreshToken.setIpAddress("172.0.0.1");
        appRefreshToken.setBrowserFingerprint("NO-INFORMATION");
        appRefreshTokenService.save(appRefreshToken);
        return authenticationResponseDTO;
    }

    @Override
    public void logout(String refreshToken) {
        if (jwtUtils.validateJwtRefreshToken(refreshToken)) {
            String userName = jwtUtils.getUserNameFromJwtRefreshToken(refreshToken);
            appUserService.findByUsername(userName).ifPresent(appRefreshTokenService::deleteByUserId);
        }

    }

    @Override
    public AuthenticationResponseDTO refresh(String refreshToken) {

        if (jwtUtils.validateJwtRefreshToken(refreshToken)) {
            String userName = jwtUtils.getUserNameFromJwtRefreshToken(refreshToken);
            Optional<AppUser> appUserOptional = appUserService.findByUsername(userName);
            if (appUserOptional.isPresent() && appRefreshTokenService.isOriginal(refreshToken)) {

                AppUser appUser = appUserOptional.get();
                AppUserDTO appUserDTO = toAppUserDTO.convert(appUser);
                AuthenticationResponseDTO authenticationResponseDTO = AuthenticationResponseDTO.builder()
                        .userId(appUser.getId())
                        .user(appUserDTO)
                        .accessToken((jwtUtils.generateJwtAccessToken(appUser.getEmail())))
                        .refreshToken(jwtUtils.generateJwtRefreshToken(appUser.getEmail()))
                        .build();

                AppRefreshToken appRefreshToken = new AppRefreshToken();
                appRefreshToken.setRefreshToken((authenticationResponseDTO.getRefreshToken()));
                appRefreshToken.setAppUser(appUser);
                appRefreshToken.setIpAddress("172.0.0.1");
                appRefreshToken.setBrowserFingerprint("NO-INFORMATION");
                appRefreshTokenService.save(appRefreshToken);
                return authenticationResponseDTO;
            }
        }
        return null;
    }
}
