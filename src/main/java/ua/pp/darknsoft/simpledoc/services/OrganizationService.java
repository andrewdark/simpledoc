package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.entities.Organization;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

public interface OrganizationService extends CRUDService<OrganizationDTO, Long> {
    Organization getReferenceById(Long organizationId) throws AppException;
}
