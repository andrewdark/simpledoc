package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.recordgroup.RecordGroupDTOToRecordGroupConverter;
import ua.pp.darknsoft.simpledoc.converters.recordgroup.RecordGroupToRecordGroupDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.RecordGroupRepository;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class RecordGroupServiceImpl implements RecordGroupService {

    private final RecordGroupRepository recordGroupRepository;
    private final RecordGroupDTOToRecordGroupConverter toEntityConverter;
    private final RecordGroupToRecordGroupDTOConverter toDTOConverter;

    public RecordGroupServiceImpl(RecordGroupRepository recordGroupRepository, RecordGroupDTOToRecordGroupConverter toEntityConverter, RecordGroupToRecordGroupDTOConverter toDTOConverter) {
        this.recordGroupRepository = recordGroupRepository;

        this.toEntityConverter = toEntityConverter;
        this.toDTOConverter = toDTOConverter;
    }

    @Override
    @Transactional
    public RecordGroupDTO add(RecordGroupDTO dto) {
        try {
            RecordGroup newEntity = toEntityConverter.convert(dto);
            newEntity.setId(null);
            RecordGroup savedEntity = recordGroupRepository.save(newEntity);
            return toDTOConverter.convert(savedEntity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    @Transactional
    public Iterable<RecordGroupDTO> addAll(Iterable<RecordGroupDTO> entityList) {
        try {
            return null;
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    @Transactional
    public RecordGroupDTO addChildren(Long parentId, RecordGroupDTO childrenDTO) {
        try {
            RecordGroup parent = recordGroupRepository.getReferenceById(parentId);
            RecordGroup children = toEntityConverter.convert(childrenDTO);
            children.setParent(parent);
            return toDTOConverter.convert(recordGroupRepository.save(children));
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    public RecordGroup getReference(Long recordGroupId) {
        return recordGroupRepository.getReferenceById(recordGroupId);
    }

    @Override
    @Transactional
    public RecordGroupDTO update(Long id, RecordGroupDTO newDTO) throws AppException {
        try {
            RecordGroup entity = recordGroupRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setName(newDTO.getName());
            entity.setTemplateNum(newDTO.getTemplateNum());
            entity.setIndexNum(newDTO.getIndexNum());
            entity.setRecordGroupType(newDTO.getRecordGroupType());


            return toDTOConverter.convert(recordGroupRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    @Transactional
    public Iterable<RecordGroupDTO> updateAll(Map<Long, RecordGroupDTO> newDtoMap) throws AppException {
        try {
            return null;
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    @Transactional
    public void deleteById(Long aLong) {
        try {
            recordGroupRepository.deleteById(aLong);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    @Transactional
    public void delete(RecordGroupDTO entity) {
        try {
            if (Objects.nonNull(entity)) {
                deleteById(entity.getId());
            }
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }


    @Override
    public Optional<RecordGroupDTO> getById(Long aLong) {
        try {
            Optional<RecordGroup> recordGroupOptional = recordGroupRepository.findById(aLong);
            return recordGroupOptional.map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    public Optional<RecordGroupDTO> getByIdWithChildren(Long aLong) {
        try {
            Optional<RecordGroup> recordGroupOptional = recordGroupRepository.findByIdWithChildren(aLong);
            return recordGroupOptional.map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    public Page<RecordGroupDTO> getRootItems(Pageable pageable) {
        try {
            return recordGroupRepository.findRootItems(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }


    @Override
    public Page<RecordGroupDTO> findAll(Pageable pageable) {
        try {
            return getRootItems(pageable);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    public Boolean isExist(RecordGroupDTO entity) {
        try {
            if (Objects.isNull(entity) || Objects.isNull(entity.getId())) return false;
            return recordGroupRepository.existsById(entity.getId());
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }
}
