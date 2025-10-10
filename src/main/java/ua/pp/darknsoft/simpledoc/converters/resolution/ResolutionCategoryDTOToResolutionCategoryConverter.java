package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ResolutionCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.ResolutionCategory;

@Component
public class ResolutionCategoryDTOToResolutionCategoryConverter implements Converter<ResolutionCategoryDTO, ResolutionCategory> {
    @Override
    public ResolutionCategory convert(ResolutionCategoryDTO source) {
        return ResolutionCategory.builder()
                .id(source.getId())
                .name(source.getName())
                .deleted(source.getDeleted())
                .build();
    }
}
