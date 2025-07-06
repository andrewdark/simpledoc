package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ResolutionCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.ResolutionCategory;

@Component
public class ResolutionCategoryToResolutionCategoryDTOConverter implements Converter<ResolutionCategory, ResolutionCategoryDTO> {
    @Override
    public ResolutionCategoryDTO convert(ResolutionCategory source) {
        return ResolutionCategoryDTO.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
