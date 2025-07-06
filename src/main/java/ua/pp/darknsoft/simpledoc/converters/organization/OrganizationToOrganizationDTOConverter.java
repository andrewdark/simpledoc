package ua.pp.darknsoft.simpledoc.converters.organization;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.entities.Organization;

@Component
public class OrganizationToOrganizationDTOConverter implements Converter<Organization, OrganizationDTO> {
    @Override
    public OrganizationDTO convert(Organization source) {
        return OrganizationDTO.builder()
                .id(source.getId())
                .build();
    }
}
