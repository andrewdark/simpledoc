package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.ResolutionCategoryDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.ResolutionCategoryRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResolutionCategoryServiceImpl implements ResolutionCategoryService{

    private final ResolutionCategoryRepository resolutionCategoryRepository;

    @Override
    @Transactional
    public ResolutionCategoryDTO add(ResolutionCategoryDTO resolutionCategoryDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<ResolutionCategoryDTO> addAll(Iterable<ResolutionCategoryDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public ResolutionCategoryDTO update(Long aLong, ResolutionCategoryDTO newDTO) throws AppException {
        return null;
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
    public void softDeleteById(Long resolutionCategoryDTO) throws AppException {

    }

    @Override
    public Optional<ResolutionCategoryDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<ResolutionCategoryDTO> findAll(Pageable pageable) throws AppException {
        return null;
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
