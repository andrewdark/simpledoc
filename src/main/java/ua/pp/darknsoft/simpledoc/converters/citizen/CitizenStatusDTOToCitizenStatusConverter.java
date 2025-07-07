package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenStatusDTO;
import ua.pp.darknsoft.simpledoc.entities.CitizenStatus;

@Component
public class CitizenStatusDTOToCitizenStatusConverter implements Converter<CitizenStatusDTO, CitizenStatus> {
    @Override
    public CitizenStatus convert(CitizenStatusDTO source) {
        return CitizenStatus.builder()
                .id(source.getId())
                .name(source.getName())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();
    }
}
