package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenCategoryDTOToCitizenCategoryConverter;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenCategoryToCitizenCategoryDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CitizenCategoryDTO;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CitizenCategoryRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CitizenCategoryServiceImpl implements CitizenCategoryService {

    private final CitizenCategoryRepository citizenCategoryRepository;
    private final CitizenCategoryToCitizenCategoryDTOConverter toDTOConverter;
    private final CitizenCategoryDTOToCitizenCategoryConverter toEntityConverter;

    @Override
    @Transactional
    public CitizenCategoryDTO add(CitizenCategoryDTO citizenCategoryDTO) throws AppException {
        try {
            citizenCategoryDTO.setId(null);
            citizenCategoryDTO.setDeleted(false);
            CitizenCategory citizenCategory = toEntityConverter.convert(citizenCategoryDTO);
            return toDTOConverter.convert(citizenCategoryRepository.save(citizenCategory));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CitizenCategoryDTO> addAll(Iterable<CitizenCategoryDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CitizenCategoryDTO update(Long aLong, CitizenCategoryDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<CitizenCategoryDTO> updateAll(Map<Long, CitizenCategoryDTO> newDtoMap) throws AppException {
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
            CitizenCategory entity = citizenCategoryRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            citizenCategoryRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<CitizenCategoryDTO> getById(Long id) throws AppException {
        try {
            return citizenCategoryRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<CitizenCategoryDTO> findAll(Pageable pageable) throws AppException {
        try {
            return citizenCategoryRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return citizenCategoryRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
