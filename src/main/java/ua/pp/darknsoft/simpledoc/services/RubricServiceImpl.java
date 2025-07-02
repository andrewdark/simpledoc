package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.RubricRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RubricServiceImpl implements RubricService {

    private final RubricRepository rubricRepository;

    @Override
    @Transactional
    public RubricDTO add(RubricDTO rubricDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<RubricDTO> addAll(Iterable<RubricDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public RubricDTO update(Long aLong, RubricDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<RubricDTO> updateAll(Map<Long, RubricDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void delete(RubricDTO rubricDTO) throws AppException {

    }

    @Override
    public Optional<RubricDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<RubricDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(RubricDTO rubricDTO) throws AppException {
        return null;
    }
}
