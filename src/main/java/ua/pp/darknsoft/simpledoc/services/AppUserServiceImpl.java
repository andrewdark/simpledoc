package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.security.AppUserToAppUserDTO;
import ua.pp.darknsoft.simpledoc.dto.AppUserDTO;
import ua.pp.darknsoft.simpledoc.dto.RegistrationRequestDTO;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.repositories.AppUserRepository;
import ua.pp.darknsoft.simpledoc.utils.jwt.JwtUtils;

import java.util.Optional;

@Service
@Transactional
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;
    private final JwtUtils jwtUtils;
    private final AppUserToAppUserDTO appUserDTOConverter;

    public AppUserServiceImpl(AppUserRepository appUserRepository, JwtUtils jwtUtils, AppUserToAppUserDTO appUserDTOConverter) {
        this.appUserRepository = appUserRepository;
        this.jwtUtils = jwtUtils;
        this.appUserDTOConverter = appUserDTOConverter;
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<AppUser> findByUsername(String email) {
        return appUserRepository.findUserWithRolesByEmail(email);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<AppUserDTO> findByAccessToken(String accessToken) {

        try {
            String username = jwtUtils.getUserNameFromJwtAccessToken(accessToken);
            Optional<AppUser> appUserOptional = this.findByUsername(username);
            if(appUserOptional.isPresent()){
                AppUserDTO appUserDTO = appUserDTOConverter.convert(appUserOptional.get());
                return Optional.of(appUserDTO);
            }

        } catch (Exception ex) {
            System.out.println("Exception: " + ex.getMessage());
        }
        return Optional.empty();
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean isExistsByUserName(String email) {
        return appUserRepository.existsByEmail(email.toLowerCase());
    }

    @Transactional(readOnly = true)
    @Override
    public Boolean isExists(AppUser appUser) {
        return appUserRepository.existsByEmail(appUser.getEmail().toLowerCase());
    }

    @Transactional(readOnly = true)
    @Override
    public Page<AppUserDTO> getAll(Pageable page) {
        return appUserRepository.findAll(page).map(appUserDTOConverter::convert);
    }

    @Override
    public Page<AppUserDTO> getAllEnabled(Pageable page) {
        return appUserRepository.findAllByEnabled(true, page).map(appUserDTOConverter::convert);
    }

    @Override
    public AppUser getReference(Long id) {
        return appUserRepository.getReferenceById(id);
    }

    @Override
    public Page<AppUser> getAllDisabled(Pageable page) {
        return appUserRepository.findAllByEnabled(false, page);
    }

    @Override
    public AppUser createAppUser(RegistrationRequestDTO registrationUser) {
        AppUser savedUser = new AppUser();
        AppUser newAppUser = AppUser.builder()
                .firstName(registrationUser.getFirstName().toUpperCase())
                .lastName(registrationUser.getLastName().toUpperCase())
                .email(registrationUser.getEmail().toLowerCase())
                .encryptedPassword(registrationUser.getPassword())
                .enabled(true)
                .build();

        if (!isExists(newAppUser))
            savedUser = appUserRepository.save(newAppUser);

        return savedUser;
    }
}
