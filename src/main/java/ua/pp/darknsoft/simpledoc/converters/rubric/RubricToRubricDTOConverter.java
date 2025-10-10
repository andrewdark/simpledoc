package ua.pp.darknsoft.simpledoc.converters.rubric;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RubricToRubricDTOConverter implements Converter<Rubric, RubricDTO> {
    private final EntityManagerFactory entityManagerFactory;

    @Override
    public RubricDTO convert(Rubric source) {
        RubricDTO target = RubricDTO.builder()
                .id(source.getId())
                .name(source.getName())
                .code(source.getCode())
                .node(source.getNode())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getParent()) && util.isLoaded(source.getParent())) {
            target.setParent(this.convert(source.getParent()));
        }
        if (Objects.nonNull(source.getChildren()) && util.isLoaded(source.getChildren())) {
            target.setChildren(source.getChildren().stream().map(this::convert).collect(Collectors.toList()));
        }
        return target;
    }
}
