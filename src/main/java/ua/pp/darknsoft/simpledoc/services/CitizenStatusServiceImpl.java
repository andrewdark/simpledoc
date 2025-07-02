package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.CitizenStatusDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CitizenStatusRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CitizenStatusServiceImpl implements CitizenStatusService{

    private final CitizenStatusRepository citizenStatusRepository;

    @Override
    @Transactional
    public CitizenStatusDTO add(CitizenStatusDTO citizenStatusDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<CitizenStatusDTO> addAll(Iterable<CitizenStatusDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CitizenStatusDTO update(Long aLong, CitizenStatusDTO newDTO) throws AppException {
        return null;
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
    public void softDeleteById(Long citizenStatusDTO) throws AppException {

    }

    @Override
    public Optional<CitizenStatusDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<CitizenStatusDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(CitizenStatusDTO citizenStatusDTO) throws AppException {
        return null;
    }
}
