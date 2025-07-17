package ua.pp.darknsoft.simpledoc.services.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;

import java.util.Map;
import java.util.Optional;

public interface CRUDService<DTO, ID> {
    DTO add(DTO dto) throws AppException;

    Iterable<DTO> addAll(Iterable<DTO> entityList) throws AppException;

    DTO update(ID id, DTO newDTO) throws AppException;

    Iterable<DTO> updateAll(Map<ID, DTO> newDtoMap) throws AppException;

    void deleteById(ID id) throws AppException;

    void softDeleteById(ID id) throws AppException;

    Optional<DTO> getById(ID id) throws AppException;

    Page<DTO> findAll(Pageable pageable) throws AppException;

    Boolean isExistById(ID id) throws AppException;

}
