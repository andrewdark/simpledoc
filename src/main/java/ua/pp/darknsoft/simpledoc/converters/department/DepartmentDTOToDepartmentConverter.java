package ua.pp.darknsoft.simpledoc.converters.department;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.security.AppUserDTOToAppUserConverter;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DepartmentDTOToDepartmentConverter implements Converter<DepartmentDTO, Department> {
    private final EntityManagerFactory entityManagerFactory;
    private final AppUserDTOToAppUserConverter appUserDTOToAppUserConverter;

    @Override
    public Department convert(DepartmentDTO source) {
        Department target = Department.builder()
                .id(source.getId())
                .name(source.getName())
                .position(source.getPosition())
                .official(source.getOfficial())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (source.getParent()!=null && util.isLoaded(source.getParent())) {
            target.setParent(this.convert(source.getParent()));
        }
        if (source.getChildren()!=null && util.isLoaded(source.getChildren())) {
            target.setChildren(source.getChildren().stream().map(this::convert).collect(Collectors.toList()));
        }
        if (source.getAppUserDTO()!=null && util.isLoaded(source.getAppUserDTO())) {
            target.setAppUser(appUserDTOToAppUserConverter.convert(source.getAppUserDTO()));
        }
        return target;
    }
}
