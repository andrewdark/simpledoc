package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;

@Component
public class CitizenToCitizenDTOConverter implements Converter<Citizen, CitizenDTO> {
    @Override
    public CitizenDTO convert(Citizen source) {

        return CitizenDTO.builder()
                .id(source.getId())
                .build();
    }
}
