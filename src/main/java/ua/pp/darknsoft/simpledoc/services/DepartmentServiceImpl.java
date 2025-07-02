package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.DepartmentRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{

    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public DepartmentDTO add(DepartmentDTO departmentDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<DepartmentDTO> addAll(Iterable<DepartmentDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public DepartmentDTO update(Long aLong, DepartmentDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<DepartmentDTO> updateAll(Map<Long, DepartmentDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void delete(DepartmentDTO departmentDTO) throws AppException {

    }

    @Override
    public Optional<DepartmentDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<DepartmentDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(DepartmentDTO departmentDTO) throws AppException {
        return null;
    }
}
