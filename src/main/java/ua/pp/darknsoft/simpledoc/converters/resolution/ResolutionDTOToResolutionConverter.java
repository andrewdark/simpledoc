package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.entities.Resolution;

@Component
public class ResolutionDTOToResolutionConverter implements Converter<ResolutionDTO, Resolution> {
    @Override
    public Resolution convert(ResolutionDTO source) {
        return Resolution.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
