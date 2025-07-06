package ua.pp.darknsoft.simpledoc.converters.record;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.recordgroup.RecordGroupToRecordGroupDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.records.CitizensRecord;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

@Component
@RequiredArgsConstructor
public class RecordToRecordDTOConverter implements Converter<Record, RecordDTO> {

    private final RecordGroupToRecordGroupDTOConverter recordGroupToRecordGroupDTOConverter;
    private final EntityManagerFactory entityManagerFactory;

    @Override
    public RecordDTO convert(Record source) {

        RecordDTO recordDTO = switch (source.getClass().getSimpleName()) {
            case "IncomingRecord" -> RecordDTO.builder()
                    .id(source.getId())
                    .orderNum(source.getOrderNum())
                    .regNum(source.getRegNum())
                    .regDate(source.getRegDate())
                    .consist(source.getConsist())
                    .content(source.getContent())
                    .note(source.getNote())
                    .build();
            case "InnerRecord" -> RecordDTO.builder()
                    .id(source.getId())
                    .orderNum(source.getOrderNum())
                    .regNum(source.getRegNum())
                    .regDate(source.getRegDate())
                    .consist(source.getConsist())
                    .content(source.getContent())
                    .note(source.getNote())
                    .build();
            case "CitizensRecord" -> RecordDTO.builder()
                    .id(source.getId())
                    .orderNum(source.getOrderNum())
                    .regNum(source.getRegNum())
                    .regDate(source.getRegDate())
                    .consist(source.getConsist())
                    .content(source.getContent())
                    .note(source.getNote())
                    .collective(((CitizensRecord) source).getCollective())
                    .signCount(((CitizensRecord) source).getSignCount())
                    .build();
            case "OutgoingRecord" -> RecordDTO.builder()
                    .id(source.getId())
                    .orderNum(source.getOrderNum())
                    .regNum(source.getRegNum())
                    .regDate(source.getRegDate())
                    .consist(source.getConsist())
                    .content(source.getContent())
                    .note(source.getNote())
                    .build();
            default -> RecordDTO.builder()
                    .id(source.getId())
                    .orderNum(source.getOrderNum())
                    .regNum(source.getRegNum())
                    .regDate(source.getRegDate())
                    .consist(source.getConsist())
                    .content(source.getContent())
                    .note(source.getNote())
                    .build();
        };

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (source.getRecordGroup() != null && util.isLoaded(source.getRecordGroup())) {
            RecordGroupDTO recordGroupDTO = recordGroupToRecordGroupDTOConverter.convert(source.getRecordGroup());
            recordDTO.setRecordGroup(recordGroupDTO);
        }

        return recordDTO;
    }
}
