package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.ResolutionDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.ResolutionRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ResolutionServiceImpl implements ResolutionService {
    private final ResolutionRepository resolutionRepository;

    @Override
    public ResolutionDTO add(ResolutionDTO resolutionDTO) throws AppException {
        return null;
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
    public void delete(ResolutionDTO resolutionDTO) throws AppException {

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
    public Boolean isExist(ResolutionDTO resolutionDTO) throws AppException {
        return null;
    }
}
