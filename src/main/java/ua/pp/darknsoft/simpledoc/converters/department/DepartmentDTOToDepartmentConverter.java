package ua.pp.darknsoft.simpledoc.converters.department;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.security.AppUserDTOToAppUserConverter;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DepartmentDTOToDepartmentConverter implements Converter<DepartmentDTO, Department> {
    private final AppUserDTOToAppUserConverter appUserDTOToAppUserConverter;

    @Override
    public Department convert(DepartmentDTO source) {
        Department target = Department.builder()
                .id(source.getId())
                .name(source.getName())
                .position(source.getPosition())
                .official(source.getOfficial())
                .deleted(source.getDeleted())
                .build();


        if (Objects.nonNull(source.getParent())) {
            target.setParent(this.convert(source.getParent()));
        }
        if (Objects.nonNull(source.getChildren())) {
            target.setChildren(source.getChildren().stream().map(this::convert).collect(Collectors.toList()));
        }
        if (Objects.nonNull(source.getAppUserDTO())) {
            target.setAppUser(appUserDTOToAppUserConverter.convert(source.getAppUserDTO()));
        }
        return target;
    }
}
