package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;

@Component
public class CitizenCategoryDTOToCitizenCategoryConverter  implements Converter<CitizenCategoryDTO, CitizenCategory> {
    @Override
    public CitizenCategory convert(CitizenCategoryDTO source) {
        return CitizenCategory.builder()
                .id(source.getId())
                .name(source.getName())
                .deleted(source.getDeleted())
                .build();
    }
}
