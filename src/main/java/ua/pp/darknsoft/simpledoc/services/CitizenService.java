package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface CitizenService extends CRUDService<CitizenDTO, Long> {
    Citizen getReferenceById(Long citizenId) throws AppException;

    List<Citizen> findByIdIn(List<Long> ids) throws AppException;
}
