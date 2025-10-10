package ua.pp.darknsoft.simpledoc.converters.department;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.security.AppUserToAppUserDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DepartmentToDepartmentDTOConverter implements Converter<Department, DepartmentDTO> {
    private final EntityManagerFactory entityManagerFactory;
    private final AppUserToAppUserDTOConverter appUserToAppUserDTOConverter;

    @Override
    public DepartmentDTO convert(Department source) {
        DepartmentDTO target = DepartmentDTO.builder()
                .id(source.getId())
                .name(source.getName())
                .position(source.getPosition())
                .official(source.getOfficial())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getParent()) && util.isLoaded(source.getParent())) {
            target.setParent(this.convert(source.getParent()));
        }
        if (Objects.nonNull(source.getChildren()) && util.isLoaded(source.getChildren())) {
            target.setChildren(source.getChildren().stream().map(this::convert).collect(Collectors.toList()));
        }
        if (Objects.nonNull(source.getAppUser()) && util.isLoaded(source.getAppUser())) {
            target.setAppUserDTO(appUserToAppUserDTOConverter.convert(source.getAppUser()));
        }
        return target;
    }
}
