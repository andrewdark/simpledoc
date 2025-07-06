package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.rubric.RubricDTOToRubricConverter;
import ua.pp.darknsoft.simpledoc.converters.rubric.RubricToRubricDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.RubricDTO;
import ua.pp.darknsoft.simpledoc.entities.Rubric;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.RubricRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RubricServiceImpl implements RubricService {

    private final RubricRepository rubricRepository;
    private final RubricToRubricDTOConverter toDTOConverter;
    private final RubricDTOToRubricConverter toEntityConverter;

    @Override
    @Transactional
    public RubricDTO add(RubricDTO rubricDTO) throws AppException {
        try {
            rubricDTO.setId(null);

            Rubric rubric = toEntityConverter.convert(rubricDTO);
            return toDTOConverter.convert(rubricRepository.save(rubric));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
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
    public void softDeleteById(Long rubricDTO) throws AppException {

    }

    @Override
    public Optional<RubricDTO> getById(Long id) throws AppException {
        try {
            return rubricRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<RubricDTO> findAll(Pageable pageable) throws AppException {
        try {
            return rubricRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return rubricRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
