package ua.pp.darknsoft.simpledoc.converters.security;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.AppUserDTO;
import ua.pp.darknsoft.simpledoc.entities.security.AppRole;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.entities.security.RoledUser;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class AppUserToAppUserDTO implements Converter<AppUser, AppUserDTO> {
    @Override
    @NonNull
    public AppUserDTO convert(AppUser source) {
        List<String> roles = null;
        if(source.getRoledUsers()!=null){
            roles = source.getRoledUsers().stream().map(RoledUser::getAppRole).filter(Objects::nonNull).map(AppRole::getRoleName).collect(Collectors.toList());
        }
        return AppUserDTO.builder()
                .userId(source.getId())
                .lastName(source.getLastName())
                .firstName(source.getFirstName())
                .email(source.getEmail())
                .enabled(source.getEnabled())
                .roleList(roles)
                .build();
    }
}
