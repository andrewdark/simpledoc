package ua.pp.darknsoft.simpledoc.converters.correspondent;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenDTOToCitizenConverter;
import ua.pp.darknsoft.simpledoc.converters.organization.OrganizationDTOToOrganizationConverter;
import ua.pp.darknsoft.simpledoc.converters.organization.OrganizationToOrganizationDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.Organization;
import ua.pp.darknsoft.simpledoc.entities.enums.CorrespondentType;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CorrespondentDTOToCorrespondentConverter implements Converter<CorrespondentDTO, Correspondent> {
    private final CitizenDTOToCitizenConverter citizenDTOToCitizenConverter;
    private final OrganizationDTOToOrganizationConverter organizationDTOToOrganizationConverter;

    @Override
    public Correspondent convert(CorrespondentDTO source) {
        Correspondent target = Correspondent.builder()
                .id(source.getId())
                .outNum(source.getOutNum())
                .outDate(source.getOutDate())
                .note(source.getNote())
                .signatory(source.getSignatory())
                .correspondentType(source.getCorrespondentType())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        if (source.getCitizen() != null) {
            target.setCitizen(citizenDTOToCitizenConverter.convert(source.getCitizen()));
        }
        if (source.getOrganization() != null) {
            target.setOrganization(organizationDTOToOrganizationConverter.convert(source.getOrganization()));
        }
        return target;
    }
}
