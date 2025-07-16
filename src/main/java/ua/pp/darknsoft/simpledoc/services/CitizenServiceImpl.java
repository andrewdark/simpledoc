package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenDTOToCitizenConverter;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenToCitizenDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CitizenRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CitizenServiceImpl implements CitizenService {

    private final CitizenRepository citizenRepository;
    private final CitizenToCitizenDTOConverter toDTOConverter;
    private final CitizenDTOToCitizenConverter toEntityConverter;

    @Override
    @Transactional
    public CitizenDTO add(CitizenDTO citizenDTO) throws AppException {
        try {
            citizenDTO.setId(null);
            citizenDTO.setDeleted(false);

            Citizen citizen = toEntityConverter.convert(citizenDTO);
            return toDTOConverter.convert(citizenRepository.save(citizen));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CitizenDTO> addAll(Iterable<CitizenDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CitizenDTO update(Long id, CitizenDTO newDTO) throws AppException {
        try {
            Citizen entity = citizenRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setFullName(newDTO.getFullName());
            entity.setAddress(newDTO.getAddress());

            return toDTOConverter.convert(citizenRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CitizenDTO> updateAll(Map<Long, CitizenDTO> newDtoMap) throws AppException {
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
            Citizen entity = citizenRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            citizenRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<CitizenDTO> getById(Long id) throws AppException {
        try {
            return citizenRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<CitizenDTO> findAll(Pageable pageable) throws AppException {
        try {
            return citizenRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return citizenRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Citizen getReferenceById(Long citizenId) throws AppException {
        try {
            return citizenRepository.getReferenceById(citizenId);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public List<Citizen> findByIdIn(List<Long> ids) throws AppException {
        try {
            return citizenRepository.findByIdIn(ids);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
