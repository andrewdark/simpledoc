package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.record.RecordDTOToRecordConverter;
import ua.pp.darknsoft.simpledoc.converters.record.RecordToRecordDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.RecordRepository;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService{

    private final RecordRepository recordRepository;
    private final RecordGroupService recordGroupService;
    private final RecordDTOToRecordConverter toEntityConverter;
    private final RecordToRecordDTOConverter toDTOConverter;

    @Override
    @Transactional
    public RecordDTO add(RecordDTO recordDTO) throws AppException {
        try {
            Record newEntity = toEntityConverter.convert(recordDTO);
            if(Objects.isNull(newEntity)) return null;
            newEntity.setId(null);

            RecordGroup recordGroup = recordGroupService.getReference(newEntity.getRecordGroup().getId());
            newEntity.setRecordGroup(recordGroup);

            Record savedEntity = recordRepository.save(newEntity);
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
    public RecordDTO update(Long aLong, RecordDTO newDTO) throws AppException {
        return null;
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
    public void softDeleteById(Long recordDTO) throws AppException {

    }

    @Override
    public Optional<RecordDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
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
}
