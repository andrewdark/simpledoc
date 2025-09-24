package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface CitizenService extends CRUDService<CitizenDTO, Long> {
    Citizen getReferenceById(Long citizenId) throws AppException;

    List<Citizen> findByIdIn(List<Long> ids) throws AppException;

    Page<CitizenDTO> getAllByFullNameLike(String fullName, Pageable pageable) throws AppException;
}
