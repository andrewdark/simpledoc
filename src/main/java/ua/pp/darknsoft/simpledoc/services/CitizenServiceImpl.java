package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CitizenRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CitizenServiceImpl implements CitizenService{

    private final CitizenRepository citizenRepository;

    @Override
    @Transactional
    public CitizenDTO add(CitizenDTO citizenDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<CitizenDTO> addAll(Iterable<CitizenDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CitizenDTO update(Long aLong, CitizenDTO newDTO) throws AppException {
        return null;
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
    public void delete(CitizenDTO citizenDTO) throws AppException {

    }

    @Override
    public Optional<CitizenDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<CitizenDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(CitizenDTO citizenDTO) throws AppException {
        return null;
    }
}
