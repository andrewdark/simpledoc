package ua.pp.darknsoft.simpledoc.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ua.pp.darknsoft.simpledoc.dto.AuthenticationRequestDTO;
import ua.pp.darknsoft.simpledoc.dto.AuthenticationResponseDTO;
import ua.pp.darknsoft.simpledoc.dto.RegistrationRequestDTO;
import ua.pp.darknsoft.simpledoc.services.AuthService;

import java.net.URI;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {

    @Value("${app.jwt.jwtRefreshExpirationMs}")
    private long jwtRefreshExpirationMs;
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> registration(@RequestBody RegistrationRequestDTO registrationRequestDTO, HttpServletResponse response) {
        if (Objects.isNull(registrationRequestDTO.getFirstName()) || Objects.isNull(registrationRequestDTO.getLastName()) || Objects.isNull(registrationRequestDTO.getEmail()) || Objects.isNull(registrationRequestDTO.getPassword())) {
            return ResponseEntity.badRequest()
                    .body("Error: All fields required");
        }
        AuthenticationResponseDTO authenticationResponseDTO = authService.registration(registrationRequestDTO);
        if (Objects.isNull(authenticationResponseDTO)) return ResponseEntity.badRequest()
                .body("Error: Username is already taken!");
        //Set cookie with  RefreshToken
        if (Objects.nonNull(authenticationResponseDTO.getRefreshToken())) {
            response.addCookie(getRefreshTokenCookie(authenticationResponseDTO.getRefreshToken(), getRefreshMaxAge()));
        }
        return ResponseEntity.ok(authenticationResponseDTO);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO authenticationRequest, HttpServletResponse response) throws Exception {
        try {
            AuthenticationResponseDTO responseDTO = authService.authenticateUser(authenticationRequest);
            //Set cookie with  RefreshToken
            if (Objects.nonNull(responseDTO.getRefreshToken())) {
                response.addCookie(getRefreshTokenCookie(responseDTO.getRefreshToken(), getRefreshMaxAge()));
            }
            return ResponseEntity.ok(responseDTO);

        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "refresh-token", defaultValue = "") String requestRefreshTokenCookie,
                                    HttpServletResponse response) {
        String refreshToken = null;
        if (Strings.isNotBlank(requestRefreshTokenCookie)) {
            refreshToken = requestRefreshTokenCookie;
            response.addCookie(getRefreshTokenCookie(null, 0)); //Delete Cookie
        }

        authService.logout(refreshToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refresh-token", defaultValue = "") String requestRefreshTokenCookie,
                                     HttpServletResponse response) {
        String refreshToken = null;
        if (Strings.isNotBlank(requestRefreshTokenCookie)) {
            refreshToken = requestRefreshTokenCookie;
            AuthenticationResponseDTO responseDTO = authService.refresh(refreshToken);
            if (Objects.isNull(responseDTO)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            if (Objects.nonNull(responseDTO.getRefreshToken())) {
                response.addCookie(getRefreshTokenCookie(responseDTO.getRefreshToken(), getRefreshMaxAge()));
            }
            return ResponseEntity.ok(responseDTO);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    //UTILS PRIVATE
    private int getRefreshMaxAge() {
        return (int) TimeUnit.MILLISECONDS.toSeconds(jwtRefreshExpirationMs);
    }

    private Cookie getRefreshTokenCookie(String refreshToken, int maxAge) {
        final String baseUrl =
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        Cookie cookie = new Cookie("refresh-token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to true if using HTTPS
        cookie.setMaxAge(maxAge);
        URI uri = URI.create(baseUrl + "/api/auth/").normalize();
        cookie.setDomain(uri.getHost());
        cookie.setPath(uri.getPath());
        return cookie;
    }
}
