package ua.pp.darknsoft.simpledoc.converters.recordgroup;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;

@Component
public class RecordGroupDTOToRecordGroupConverter implements Converter<RecordGroupDTO, RecordGroup> {
    @Override
    @NonNull
    public RecordGroup convert(RecordGroupDTO source) {

        return RecordGroup.builder()
                .id(source.getId())
                .name(source.getName())
                .indexNum(source.getIndexNum())
                .templateNum(source.getTemplateNum())
                .recordGroupType(source.getRecordGroupType())
                .deleted(source.getDeleted())
                .node(source.getNode())
                .build();
    }
}
