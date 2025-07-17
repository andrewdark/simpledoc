package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.record.RecordDTOToRecordConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordToRecordDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;
import ua.pp.darknsoft.simpledoc.entities.records.*;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.filters.RecordSearchFilter;
import ua.pp.darknsoft.simpledoc.repositories.RecordRepository;
import ua.pp.darknsoft.simpledoc.repositories.records.CitizensRecordRepository;
import ua.pp.darknsoft.simpledoc.repositories.records.IncomingRecordRepository;
import ua.pp.darknsoft.simpledoc.repositories.records.InnerRecordRepository;
import ua.pp.darknsoft.simpledoc.repositories.records.OutgoingRecordRepository;
import ua.pp.darknsoft.simpledoc.specifications.*;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    private final CitizensRecordRepository citizensRecordRepository;
    private final IncomingRecordRepository incomingRecordRepository;
    private final InnerRecordRepository innerRecordRepository;
    private final OutgoingRecordRepository outgoingRecordRepository;

    private final RecordGroupService recordGroupService;

    private final CorrespondentService correspondentService;
    private final RecordDTOToRecordConverter toEntityConverter;
    private final RecordToRecordDTOConverter toDTOConverter;

    @Override
    @Transactional
    public RecordDTO add(RecordDTO recordDTO) throws AppException {
        try {
            recordDTO.setId(null);
            //recordDTO.setDeleted(false);
            if (recordDTO.getCorrespondents() != null) {
                long countCitizen = recordDTO.getCorrespondents().stream().filter(Objects::nonNull).map(CorrespondentDTO::getCitizen).filter(Objects::nonNull).count();
                long countOrganization = recordDTO.getCorrespondents().stream().filter(Objects::nonNull).map(CorrespondentDTO::getOrganization).filter(Objects::nonNull).count();
                if (countCitizen > 0 && countOrganization > 0) {
                    throw new AppException("Не може бути документ одночасно з кореспондентами як організацій так і громадян");
                }
            }
            Record newEntity = toEntityConverter.convert(recordDTO);

            RecordGroup recordGroup = recordGroupService.getReference(newEntity.getRecordGroup().getId());
            newEntity.setRecordGroup(recordGroup);
            Record savedEntity = recordRepository.save(newEntity);
            correspondentService.saveAll(savedEntity, recordDTO.getCorrespondents());
            return toDTOConverter.convert(savedEntity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<RecordDTO> addAll(Iterable<RecordDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public RecordDTO update(Long id, RecordDTO newDTO) throws AppException {
        try {
            Record entity = recordRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setOrderNum(newDTO.getOrderNum());
            entity.setRegNum(newDTO.getRegNum());
            entity.setRegDate(newDTO.getRegDate());
            entity.setConsist(newDTO.getConsist());
            entity.setContent(newDTO.getContent());
            entity.setNote(newDTO.getNote());

            return toDTOConverter.convert(recordRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<RecordDTO> updateAll(Map<Long, RecordDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        try {
            Record entity = recordRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            //entity.setDeleted(true);
            //citizenRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<RecordDTO> getById(Long id) throws AppException {
        try {
            return recordRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<RecordDTO> findAll(Pageable pageable) throws AppException {
        try {
            return recordRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    public Boolean isExistById(Long id) throws AppException {
        try {
            return recordRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<RecordDTO> getAllByRecordGroupType(Pageable pageable, RecordGroupType type) throws AppException {
        try {
            Page<Record> recordPage = switch (type) {
                case CITIZEN -> recordRepository.findAllCitizensRecord(pageable);
                case INCOMING -> recordRepository.findAllIncomingRecord(pageable);
                case INNER -> recordRepository.findAllInnerRecord(pageable);
                case OUTGOING -> recordRepository.findAllOutgoingRecord(pageable);
                default -> recordRepository.findAllRecord(pageable);
            };
            return recordPage.map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<RecordDTO> searchRecords(RecordSearchFilter filter, Pageable pageable) throws AppException {
        try {
            Page<RecordDTO> recordPage = switch (filter.getRecordGroupType()){
                case INCOMING -> {
                    Specification<IncomingRecord> spec = IncomingRecordSpecification.withFilter(filter);
                    yield incomingRecordRepository.findAll(spec, pageable).map(toDTOConverter::convert);
                }
                case INNER -> {
                    Specification<InnerRecord> spec = InnerRecordSpecification.withFilter(filter);
                    yield innerRecordRepository.findAll(spec, pageable).map(toDTOConverter::convert);
                }
                case CITIZEN -> {
                    Specification<CitizensRecord> spec = CitizensRecordSpecification.withFilter(filter);
                    yield citizensRecordRepository.findAll(spec, pageable).map(toDTOConverter::convert);
                }
                case OUTGOING -> {
                    Specification<OutgoingRecord> spec = OutgoingRecordSpecification.withFilter(filter);
                    yield outgoingRecordRepository.findAll(spec, pageable).map(toDTOConverter::convert);
                }
                default -> {
                    Specification<Record> spec = RecordSpecification.withFilter(filter);
                    yield recordRepository.findAll(spec, pageable).map(toDTOConverter::convert);
                }

            };
            return recordPage;
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
