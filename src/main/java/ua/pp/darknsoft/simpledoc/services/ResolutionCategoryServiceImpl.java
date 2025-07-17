package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.resolution.ResolutionCategoryDTOToResolutionCategoryConverter;
import ua.pp.darknsoft.simpledoc.converters.resolution.ResolutionCategoryToResolutionCategoryDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.ResolutionCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.ResolutionCategory;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.repositories.ResolutionCategoryRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResolutionCategoryServiceImpl implements ResolutionCategoryService {

    private final ResolutionCategoryRepository resolutionCategoryRepository;
    private final ResolutionCategoryToResolutionCategoryDTOConverter toDTOConverter;
    private final ResolutionCategoryDTOToResolutionCategoryConverter toEntityConverter;

    @Override
    @Transactional
    public ResolutionCategoryDTO add(ResolutionCategoryDTO resolutionCategoryDTO) throws AppException {
        try {
            resolutionCategoryDTO.setId(null);
            resolutionCategoryDTO.setDeleted(false);

            ResolutionCategory resolutionCategory = toEntityConverter.convert(resolutionCategoryDTO);
            return toDTOConverter.convert(resolutionCategoryRepository.save(resolutionCategory));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<ResolutionCategoryDTO> addAll(Iterable<ResolutionCategoryDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public ResolutionCategoryDTO update(Long id, ResolutionCategoryDTO newDTO) throws AppException {
        try {
            ResolutionCategory entity = resolutionCategoryRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setName(newDTO.getName());

            return toDTOConverter.convert(resolutionCategoryRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<ResolutionCategoryDTO> updateAll(Map<Long, ResolutionCategoryDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        ResolutionCategory entity = resolutionCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

        entity.setDeleted(true);
        resolutionCategoryRepository.save(entity);
    }

    @Override
    public Optional<ResolutionCategoryDTO> getById(Long id) throws AppException {
        try {
            return resolutionCategoryRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<ResolutionCategoryDTO> findAll(Pageable pageable) throws AppException {
        try {
            return resolutionCategoryRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return resolutionCategoryRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
