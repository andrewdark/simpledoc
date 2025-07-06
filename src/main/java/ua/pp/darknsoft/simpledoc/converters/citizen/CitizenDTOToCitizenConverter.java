package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;

@Component
public class CitizenDTOToCitizenConverter  implements Converter<CitizenDTO, Citizen> {
    @Override
    public Citizen convert(CitizenDTO source) {
        return Citizen.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
