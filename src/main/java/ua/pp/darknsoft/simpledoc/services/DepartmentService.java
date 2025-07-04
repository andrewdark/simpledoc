package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.dto.DepartmentDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.Optional;

public interface DepartmentService extends CRUDService<DepartmentDTO, Long> {
    Optional<DepartmentDTO> getByIdWithChildren(Long id) throws AppException;

    Page<DepartmentDTO> getRootItems(Pageable pageable) throws AppException;

    DepartmentDTO addChildren(Long parentId, DepartmentDTO childrenDTO) throws AppException;

    Department getReference(Long id) throws AppException;
}
