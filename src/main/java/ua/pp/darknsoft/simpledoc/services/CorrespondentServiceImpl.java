package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CorrespondentRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CorrespondentServiceImpl implements CorrespondentService{

    private final CorrespondentRepository correspondentRepository;

    @Override
    @Transactional
    public CorrespondentDTO add(CorrespondentDTO correspondentDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<CorrespondentDTO> addAll(Iterable<CorrespondentDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CorrespondentDTO update(Long aLong, CorrespondentDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<CorrespondentDTO> updateAll(Map<Long, CorrespondentDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void softDeleteById(Long correspondentDTO) throws AppException {

    }

    @Override
    public Optional<CorrespondentDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<CorrespondentDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(CorrespondentDTO correspondentDTO) throws AppException {
        return null;
    }
}
