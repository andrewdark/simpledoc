package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.entities.Resolution;

@Component
public class ResolutionToResolutionDTOConverter implements Converter<Resolution, ResolutionDTO> {
    @Override
    public ResolutionDTO convert(Resolution source) {
        return ResolutionDTO.builder()
                .id(source.getId())
                .build();
    }
}
