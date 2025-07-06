package ua.pp.darknsoft.simpledoc.converters.correspondent;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

@Component
public class CorrespondentDTOToCorrespondentConverter implements Converter<CorrespondentDTO, Correspondent> {
    @Override
    public Correspondent convert(CorrespondentDTO source) {
        return Correspondent.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
