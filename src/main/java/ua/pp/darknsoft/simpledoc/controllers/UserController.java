package ua.pp.darknsoft.simpledoc.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import ua.pp.darknsoft.simpledoc.dto.AppUserDTO;
import ua.pp.darknsoft.simpledoc.services.AppUserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }


    @GetMapping(value = "/me")
    public ResponseEntity<AppUserDTO> me(@RequestHeader(HttpHeaders.AUTHORIZATION) String authKey) {

        if (StringUtils.hasText(authKey) && authKey.startsWith("Bearer ")) {
            String accessToken = authKey.substring(7, authKey.length());
            Optional<AppUserDTO> appUserDTOOptional = appUserService.findByAccessToken(accessToken);
            if (appUserDTOOptional.isPresent()) {
                return ResponseEntity.ok(appUserDTOOptional.get());
            } else ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER_NOT_FOUND_EXCEPTION");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<Page<AppUserDTO>> fetchAllUsers(@RequestParam(defaultValue = "0") int page,            // номер сторінки
                                                          @RequestParam(defaultValue = "10") int size,           // розмір сторінки
                                                          @RequestParam(defaultValue = "email") String sort,    // поле для сортування
                                                          @RequestParam(defaultValue = "asc") String order) {     // напрямок: asc/desc)

        Pageable pageable = PageRequest.of(page, size, order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
        Page<AppUserDTO> dto = appUserService.getAll(pageable);
        return ResponseEntity.ok(dto);
    }
}
