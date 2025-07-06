package ua.pp.darknsoft.simpledoc.converters.rubric;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

@Component
public class RubricToRubricDTOConverter implements Converter<Rubric, RubricDTO> {
    @Override
    public RubricDTO convert(Rubric source) {
        return RubricDTO.builder()
                .id(source.getId())
                .deleted(source.getDeleted())
                .build();
    }
}
