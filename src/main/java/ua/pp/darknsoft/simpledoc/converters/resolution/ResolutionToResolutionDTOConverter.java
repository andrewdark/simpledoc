package ua.pp.darknsoft.simpledoc.converters.resolution;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentToDepartmentDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordToRecordDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.entities.Resolution;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class ResolutionToResolutionDTOConverter implements Converter<Resolution, ResolutionDTO> {
    private final EntityManagerFactory entityManagerFactory;
    private final DepartmentToDepartmentDTOConverter departmentToDepartmentDTOConverter;
    private final ResolutionCategoryToResolutionCategoryDTOConverter resolutionCategoryToResolutionCategoryDTOConverter;
    private final RecordToRecordDTOConverter recordToRecordDTOConverter;

    @Override
    public ResolutionDTO convert(Resolution source) {
        ResolutionDTO target = ResolutionDTO.builder()
                .id(source.getId())
                .content(source.getContent())
                .resDate(source.getResDate())
                .planDate(source.getPlanDate())
                .factDate(source.getFactDate())
                .resume(source.getResume())
                .summary(source.getSummary())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getAuthor()) && util.isLoaded(source.getAuthor())) {
            target.setAuthor(departmentToDepartmentDTOConverter.convert(source.getAuthor()));
        }
        if (Objects.nonNull(source.getResolutionCategory()) && util.isLoaded(source.getResolutionCategory())) {
            target.setResolutionCategory(resolutionCategoryToResolutionCategoryDTOConverter.convert(source.getResolutionCategory()));
        }
        if (Objects.nonNull(source.getRecord()) && util.isLoaded(source.getRecord())) {
            target.setRecord(recordToRecordDTOConverter.convert(source.getRecord()));
        }
        return target;
    }
}
