package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.entities.Organization;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

public interface OrganizationService extends CRUDService<OrganizationDTO, Long> {
    Organization getReferenceById(Long organizationId) throws AppException;

    Page<OrganizationDTO> getAllByNameLike(String name, Pageable pageable) throws AppException;
}
