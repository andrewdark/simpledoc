package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentDTOToDepartmentConverter;
import ua.pp.darknsoft.simpledoc.converters.department.DepartmentToDepartmentDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.dto.RecordGroupDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.DepartmentRepository;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentToDepartmentDTOConverter toDTOConverter;
    private final DepartmentDTOToDepartmentConverter toEntityConverter;

    @Override
    @Transactional
    public DepartmentDTO add(DepartmentDTO dto) throws AppException {
        try {
            Department newEntity = toEntityConverter.convert(dto);
            newEntity.setId(null);
            Department savedEntity = departmentRepository.save(newEntity);
            return toDTOConverter.convert(savedEntity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<DepartmentDTO> addAll(Iterable<DepartmentDTO> entityList) throws AppException {
        try {
            return null;
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public DepartmentDTO addChildren(Long parentId, DepartmentDTO childrenDTO) {
        try {
            Department parent = departmentRepository.getReferenceById(parentId);
            Department children = toEntityConverter.convert(childrenDTO);
            children.setParent(parent);
            //parent.getChildren().add(children);
            return toDTOConverter.convert(departmentRepository.save(children));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Department getReference(Long departmentId) throws AppException {
        return departmentRepository.getReferenceById(departmentId);
    }

    @Override
    @Transactional
    public DepartmentDTO update(Long id, DepartmentDTO newDTO) throws AppException {
        try {
            Department entity = departmentRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setName(newDTO.getName());
            entity.setId(newDTO.getId());
            entity.setName(newDTO.getName());
            entity.setPosition(newDTO.getPosition());
            entity.setOfficial(newDTO.getOfficial());

            if (Objects.nonNull(newDTO.getAppUserDTO())) {
                //AppUser appUser = appUserService.getReference(newDTO.getAppUserDTO().getUserId())
                //entity.setAppUser();
            }

            //TODO: Does it necessary?
            return toDTOConverter.convert(departmentRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<DepartmentDTO> updateAll(Map<Long, DepartmentDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    public void deleteById(Long id) throws AppException {
        try {
            departmentRepository.deleteById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        try {
            Department entity = departmentRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));
            entity.setDeleted(true);
            departmentRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<DepartmentDTO> getByIdWithChildren(Long id) throws AppException {
        try {
            Optional<Department> entityOptional = departmentRepository.findByIdWithChildren(id);
            return entityOptional.map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<DepartmentDTO> getRootItems(Pageable pageable) throws AppException {
        try {
            return departmentRepository.findRootItems(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<DepartmentDTO> getById(Long id) throws AppException {
        try {
            return departmentRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<DepartmentDTO> findAll(Pageable pageable) throws AppException {
        try {
            //return departmentRepository.findAll(pageable).map(toDTOConverter::convert);
            return getRootItems(pageable);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        return departmentRepository.existsById(id);
    }
}
