package ua.pp.darknsoft.simpledoc.converters.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.AppUserDTO;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

@Component
public class AppUserDTOToAppUser implements Converter<AppUserDTO, AppUser> {

    @Override
    public AppUser convert(AppUserDTO source) {
        return AppUser.builder()
                .id(source.getUserId())
                .firstName(source.getFirstName())
                .lastName(source.getLastName())
                .email(source.getEmail())
                .build();
    }
}
