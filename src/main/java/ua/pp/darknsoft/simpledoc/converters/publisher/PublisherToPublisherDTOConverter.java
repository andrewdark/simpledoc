package ua.pp.darknsoft.simpledoc.converters.publisher;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentToDepartmentDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordToRecordDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.PublisherDTO;
import ua.pp.darknsoft.simpledoc.entities.Publisher;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class PublisherToPublisherDTOConverter implements Converter<Publisher, PublisherDTO> {

    private final EntityManagerFactory entityManagerFactory;
    private final RecordToRecordDTOConverter recordToRecordDTOConverter;
    private final DepartmentToDepartmentDTOConverter departmentToDepartmentDTOConverter;

    @Override
    public PublisherDTO convert(Publisher source) {
        PublisherDTO target = PublisherDTO.builder()
                .id(source.getId())
                .publisherType(source.getPublisherType())
                .signingDate(source.getSigningDate())
                .note(source.getNote())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getRecord()) && util.isLoaded(source.getRecord())) {
            target.setRecord(recordToRecordDTOConverter.convert(source.getRecord()));
        }
        if (Objects.nonNull(source.getOfficial()) && util.isLoaded(source.getOfficial())) {
            target.setOfficial(departmentToDepartmentDTOConverter.convert(source.getOfficial()));
        }

        return target;
    }
}
