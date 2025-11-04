package ua.pp.darknsoft.simpledoc.converters.record;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.converters.correspondent.CorrespondentToCorrespondentDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.delivery.DeliveryToDeliveryDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentToDepartmentDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.publisher.PublisherToPublisherDTOConverter;
import ua.pp.darknsoft.simpledoc.converters.recordgroup.RecordGroupToRecordGroupDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.*;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.entities.records.*;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecordToRecordDTOConverter implements Converter<Record, RecordDTO> {

    private final RecordGroupToRecordGroupDTOConverter recordGroupToRecordGroupDTOConverter;
    private final DeliveryToDeliveryDTOConverter deliveryToDeliveryDTOConverter;
    private final CorrespondentToCorrespondentDTOConverter correspondentToCorrespondentDTOConverter;
    private final PublisherToPublisherDTOConverter publisherToPublisherDTOConverter;
    private final EntityManagerFactory entityManagerFactory;

    @Override
    public RecordDTO convert(Record source) {

        RecordDTO recordDTO = RecordDTO.builder()
                .id(source.getId())
                .orderNum(source.getOrderNum())
                .regNum(source.getRegNum())
                .regDate(source.getRegDate())
                .consist(source.getConsist())
                .content(source.getContent())
                .note(source.getNote())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (Objects.nonNull(source.getRecordGroup()) && util.isLoaded(source.getRecordGroup())) {
            RecordGroupDTO recordGroupDTO = recordGroupToRecordGroupDTOConverter.convert(source.getRecordGroup());
            recordDTO.setRecordGroup(recordGroupDTO);
        }
        if (Objects.nonNull(source.getDelivery()) && util.isLoaded(source.getDelivery())) {
            DeliveryDTO deliveryDTO = deliveryToDeliveryDTOConverter.convert(source.getDelivery());
            recordDTO.setDelivery(deliveryDTO);
        }

        /*
         * CitizensRecord
         */
        if (source.getClass().equals(CitizensRecord.class)) {
            CitizensRecord record = (CitizensRecord) source;
            recordDTO.setCollective((record.getCollective()));
            recordDTO.setSignCount((record.getSignCount()));
            if (Objects.nonNull(record.getCorrespondents()) && util.isLoaded(record.getCorrespondents())) {
                List<CorrespondentDTO> correspondentDTOList = record.getCorrespondents().stream().map(correspondentToCorrespondentDTOConverter::convert).collect(Collectors.toList());
                recordDTO.setCorrespondents(correspondentDTOList);
            }
            System.out.println("CitizensRecord");
        }

        /*
         * IncomingRecord
         */
        if (source.getClass().equals(IncomingRecord.class)) {
            IncomingRecord record = (IncomingRecord) source;
            if (Objects.nonNull(record.getCorrespondents()) && util.isLoaded(record.getCorrespondents())) {
                List<CorrespondentDTO> correspondentDTOList = record.getCorrespondents().stream().map(correspondentToCorrespondentDTOConverter::convert).collect(Collectors.toList());
                recordDTO.setCorrespondents(correspondentDTOList);
            }
            System.out.println("IncomingRecord");
        }

        /*
         * InnerRecord
         */
        if (source.getClass().equals(InnerRecord.class)) {
            InnerRecord record = (InnerRecord) source;
            if (Objects.nonNull(record.getPublishers()) && util.isLoaded(record.getPublishers())) {
                List<PublisherDTO> publisherDTOList = record.getPublishers().stream().map(publisherToPublisherDTOConverter::convert).collect(Collectors.toList());
                recordDTO.setPublishers(publisherDTOList);
            }
            System.out.println("InnerRecord");
        }

        /*
         * OutgoingRecord
         */
        if (source.getClass().equals(OutgoingRecord.class)) {
            OutgoingRecord record = (OutgoingRecord) source;
            if (Objects.nonNull(record.getPublishers()) && util.isLoaded(record.getPublishers())) {
                List<PublisherDTO> publisherDTOList = record.getPublishers().stream().map(publisherToPublisherDTOConverter::convert).collect(Collectors.toList());
                recordDTO.setPublishers(publisherDTOList);
            }
            System.out.println("OutgoingRecord");
        }

        return recordDTO;
    }
}
