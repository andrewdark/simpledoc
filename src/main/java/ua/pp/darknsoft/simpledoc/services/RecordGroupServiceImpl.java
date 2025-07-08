package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordGroupServiceImpl implements RecordGroupService {

    private final RecordGroupRepository recordGroupRepository;
    private final RecordGroupDTOToRecordGroupConverter toEntityConverter;
    private final RecordGroupToRecordGroupDTOConverter toDTOConverter;

    @Override
    @Transactional
    public RecordGroupDTO add(RecordGroupDTO recordGroupDTO) {

        try {
            recordGroupDTO.setId(null);
            recordGroupDTO.setDeleted(false);

            RecordGroup recordGroup = toEntityConverter.convert(recordGroupDTO);
            return toDTOConverter.convert(recordGroupRepository.save(recordGroup));
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
            //parent.getChildren().add(children);
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
    public void softDeleteById(Long id) {
        try {
            RecordGroup entity = recordGroupRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));
            entity.setDeleted(true);
            recordGroupRepository.save(entity);
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
    public Optional<RecordGroupDTO> getByIdWithChildren(Long id) {
        try {
            Optional<RecordGroup> entityOptional = recordGroupRepository.findByIdWithChildren(id);
            return entityOptional.map(toDTOConverter::convert);
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
    public Boolean isExistById(Long id) {
        try {
            return recordGroupRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
