package ua.pp.darknsoft.simpledoc.converters.recordgroup;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecordGroupToRecordGroupDTOConverter implements Converter<RecordGroup, RecordGroupDTO> {
    private final EntityManagerFactory entityManagerFactory;
    @Override
    @NonNull
    public RecordGroupDTO convert(RecordGroup source) {

        RecordGroupDTO target = RecordGroupDTO.builder()
                .id(source.getId())
                .name(source.getName())
                .indexNum(source.getIndexNum())
                .templateNum(source.getTemplateNum())
                .recordGroupType(source.getRecordGroupType())
                .deleted(source.getDeleted())
                .node(source.getNode())
                .build();
        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (source.getChildren()!=null && util.isLoaded(source.getChildren())) {
            target.setChildren(source.getChildren().stream().map(this::convert).collect(Collectors.toList()));
        }
        return target;
    }

}

