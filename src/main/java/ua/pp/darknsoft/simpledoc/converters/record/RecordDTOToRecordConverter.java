package ua.pp.darknsoft.simpledoc.converters.record;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.correspondent.CorrespondentDTOToCorrespondentConverter;
import ua.pp.darknsoft.simpledoc.converters.recordgroup.RecordGroupDTOToRecordGroupConverter;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.entities.records.*;

import java.util.Collection;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecordDTOToRecordConverter implements Converter<RecordDTO, Record> {

    private final RecordGroupDTOToRecordGroupConverter recordGroupDTOToRecordGroupConverter;
    private final CorrespondentDTOToCorrespondentConverter correspondentDTOToCorrespondentConverter;

    @Override
    @NonNull
    public Record convert(RecordDTO source) {
        if (source.getRecordGroup() != null) {
            RecordGroup recordGroup = recordGroupDTOToRecordGroupConverter.convert(source.getRecordGroup());
            Record record = switch (source.getRecordGroup().getRecordGroupType()) {
                case INCOMING -> IncomingRecord.builder()
                        .orderNum(source.getOrderNum())
                        .regNum(source.getRegNum())
                        .regDate(source.getRegDate())
                        .consist(source.getConsist())
                        .content(source.getContent())
                        .note(source.getNote())
                        .recordGroup(recordGroup)
                        //.correspondents((source.getCorrespondents() != null && !source.getCorrespondents().isEmpty()) ? source.getCorrespondents().stream().map(correspondentDTOToCorrespondentConverter::convert).collect(Collectors.toList()) : null)
                        .build();
                case INNER -> InnerRecord.builder()
                        .orderNum(source.getOrderNum())
                        .regNum(source.getRegNum())
                        .regDate(source.getRegDate())
                        .consist(source.getConsist())
                        .content(source.getContent())
                        .note(source.getNote())
                        .recordGroup(recordGroup)
                        .build();
                case CITIZEN -> CitizensRecord.builder()
                        .orderNum(source.getOrderNum())
                        .regNum(source.getRegNum())
                        .regDate(source.getRegDate())
                        .consist(source.getConsist())
                        .content(source.getContent())
                        .note(source.getNote())
                        .recordGroup(recordGroup)
                        .collective(source.getCollective())
                        .signCount(source.getSignCount())
                        //.correspondents((source.getCorrespondents() != null && !source.getCorrespondents().isEmpty()) ? source.getCorrespondents().stream().map(correspondentDTOToCorrespondentConverter::convert).collect(Collectors.toList()) : null)
                        .build();
                case OUTGOING -> OutgoingRecord.builder()
                        .orderNum(source.getOrderNum())
                        .regNum(source.getRegNum())
                        .regDate(source.getRegDate())
                        .consist(source.getConsist())
                        .content(source.getContent())
                        .note(source.getNote())
                        .recordGroup(recordGroup)
                        .build();
                case NODE -> null;
            };
            return record;
        }

        return null;
    }
}

