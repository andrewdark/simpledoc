package ua.pp.darknsoft.simpledoc.converters.publisher;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentDTOToDepartmentConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordDTOToRecordConverter;
import ua.pp.darknsoft.simpledoc.dto.PublisherDTO;
import ua.pp.darknsoft.simpledoc.entities.Publisher;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class PublisherDTOToPublisherConverter implements Converter<PublisherDTO, Publisher> {

    private final RecordDTOToRecordConverter recordDTOToRecordConverter;
    private final DepartmentDTOToDepartmentConverter departmentDTOToDepartmentConverter;

    @Override
    public Publisher convert(PublisherDTO source) {
        Publisher target = Publisher.builder()
                .id(source.getId())
                .publisherType(source.getPublisherType())
                .signingDate(source.getSigningDate())
                .note(source.getNote())
                .build();

        if (Objects.nonNull(source.getRecord())) {
            target.setRecord(recordDTOToRecordConverter.convert(source.getRecord()));
        }
        if (Objects.nonNull(source.getOfficial())) {
            target.setOfficial(departmentDTOToDepartmentConverter.convert(source.getOfficial()));
        }
        return target;
    }
}
