package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;

@Component
public class CitizenCategoryToCitizenCategoryDTOConverter  implements Converter<CitizenCategory, CitizenCategoryDTO> {
    @Override
    public CitizenCategoryDTO convert(CitizenCategory source) {
        return CitizenCategoryDTO.builder()
                .id(source.getId())
                .build();
    }
}
