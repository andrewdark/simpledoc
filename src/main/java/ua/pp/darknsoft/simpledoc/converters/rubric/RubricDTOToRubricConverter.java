package ua.pp.darknsoft.simpledoc.converters.rubric;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

import java.time.LocalDateTime;

@Component
public class RubricDTOToRubricConverter implements Converter<RubricDTO, Rubric> {
    @Override
    public Rubric convert(RubricDTO source) {
        return Rubric.builder()
                .id(source.getId())
                .name(source.getName())
                .code(source.getCode())
                .node(source.getNode())
                .deleted(source.getDeleted())
                .build();
    }
}
