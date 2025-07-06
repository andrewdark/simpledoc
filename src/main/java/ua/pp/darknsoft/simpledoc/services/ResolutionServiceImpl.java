package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.resolution.ResolutionDTOToResolutionConverter;
import ua.pp.darknsoft.simpledoc.converters.resolution.ResolutionToResolutionDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.Resolution;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.ResolutionRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResolutionServiceImpl implements ResolutionService {
    private final ResolutionRepository resolutionRepository;
    private final ResolutionToResolutionDTOConverter toDTOConverter;
    private final ResolutionDTOToResolutionConverter toEntityConverter;

    @Override
    public ResolutionDTO add(ResolutionDTO resolutionDTO) throws AppException {
        try {
            resolutionDTO.setId(null);

            Resolution resolution = toEntityConverter.convert(resolutionDTO);
            return toDTOConverter.convert(resolutionRepository.save(resolution));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Iterable<ResolutionDTO> addAll(Iterable<ResolutionDTO> entityList) throws AppException {
        return null;
    }

    @Override
    public ResolutionDTO update(Long aLong, ResolutionDTO newDTO) throws AppException {
        return null;
    }

    @Override
    public Iterable<ResolutionDTO> updateAll(Map<Long, ResolutionDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    public void softDeleteById(Long resolutionDTO) throws AppException {

    }

    @Override
    public Optional<ResolutionDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<ResolutionDTO> findAll(Pageable pageable) throws AppException {
        try {
            return null; //resolutionRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return resolutionRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
