package ua.pp.darknsoft.simpledoc.converters.organization;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.entities.Organization;

@Component
public class OrganizationDTOToOrganizationConverter implements Converter<OrganizationDTO, Organization> {
    @Override
    public Organization convert(OrganizationDTO source) {
        return Organization.builder()
                .id(source.getId())
                .name(source.getName())
                .code(source.getCode())
                .deleted(source.getDeleted())
                .build();
    }
}
