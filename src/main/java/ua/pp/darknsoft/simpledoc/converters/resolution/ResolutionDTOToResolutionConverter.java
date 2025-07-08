package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.entities.Resolution;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class ResolutionDTOToResolutionConverter implements Converter<ResolutionDTO, Resolution> {
    @Override
    public Resolution convert(ResolutionDTO source) {
        return Resolution.builder()
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
    }
}
