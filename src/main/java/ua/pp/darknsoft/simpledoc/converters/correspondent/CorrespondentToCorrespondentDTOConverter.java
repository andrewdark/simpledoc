package ua.pp.darknsoft.simpledoc.converters.correspondent;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenToCitizenDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.organization.OrganizationToOrganizationDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordToRecordDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CorrespondentToCorrespondentDTOConverter implements Converter<Correspondent, CorrespondentDTO> {
    private final EntityManagerFactory entityManagerFactory;
    private final OrganizationToOrganizationDTOConverter organizationToOrganizationDTOConverter;
    private final CitizenToCitizenDTOConverter citizenToCitizenDTOConverter;
    private final RecordToRecordDTOConverter recordToRecordDTOConverter;

    @Override
    public CorrespondentDTO convert(Correspondent source) {
        CorrespondentDTO target = CorrespondentDTO.builder()
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

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getRecord()) && util.isLoaded(source.getRecord())) {
            target.setRecord(recordToRecordDTOConverter.convert(source.getRecord()));
        }
        if (Objects.nonNull(source.getOrganization()) && util.isLoaded(source.getOrganization())) {
            target.setOrganization(organizationToOrganizationDTOConverter.convert(source.getOrganization()));
        }
        if (Objects.nonNull(source.getCitizen()) && util.isLoaded(source.getCitizen())) {
            target.setCitizen(citizenToCitizenDTOConverter.convert(source.getCitizen()));
        }

        return target;
    }
}
