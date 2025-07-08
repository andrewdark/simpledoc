package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenStatusDTOToCitizenStatusConverter;
import ua.pp.darknsoft.simpledoc.converters.citizen.CitizenStatusToCitizenStatusDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CitizenStatusDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.CitizenStatus;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CitizenStatusRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CitizenStatusServiceImpl implements CitizenStatusService {

    private final CitizenStatusRepository citizenStatusRepository;
    private final CitizenStatusToCitizenStatusDTOConverter toDTOConverter;
    private final CitizenStatusDTOToCitizenStatusConverter toEntityConverter;

    @Override
    @Transactional
    public CitizenStatusDTO add(CitizenStatusDTO citizenStatusDTO) throws AppException {
        try {
            citizenStatusDTO.setId(null);
            citizenStatusDTO.setDeleted(false);

            CitizenStatus citizenStatus = toEntityConverter.convert(citizenStatusDTO);
            return toDTOConverter.convert(citizenStatusRepository.save(citizenStatus));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CitizenStatusDTO> addAll(Iterable<CitizenStatusDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CitizenStatusDTO update(Long id, CitizenStatusDTO newDTO) throws AppException {
        try {
            CitizenStatus entity = citizenStatusRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setName(newDTO.getName());

            return toDTOConverter.convert(citizenStatusRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CitizenStatusDTO> updateAll(Map<Long, CitizenStatusDTO> newDtoMap) throws AppException {
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
            CitizenStatus entity = citizenStatusRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            citizenStatusRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<CitizenStatusDTO> getById(Long id) throws AppException {
        try {
            return citizenStatusRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<CitizenStatusDTO> findAll(Pageable pageable) throws AppException {
        try {
            return citizenStatusRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return citizenStatusRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
