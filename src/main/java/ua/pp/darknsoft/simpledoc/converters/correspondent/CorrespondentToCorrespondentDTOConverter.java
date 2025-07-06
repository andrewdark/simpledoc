package ua.pp.darknsoft.simpledoc.converters.correspondent;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

@Component
public class CorrespondentToCorrespondentDTOConverter implements Converter<Correspondent, CorrespondentDTO> {
    @Override
    public CorrespondentDTO convert(Correspondent source) {
        return CorrespondentDTO.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
