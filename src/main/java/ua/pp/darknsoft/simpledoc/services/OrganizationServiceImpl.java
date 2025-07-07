package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.organization.OrganizationDTOToOrganizationConverter;
import ua.pp.darknsoft.simpledoc.converters.organization.OrganizationToOrganizationDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.Organization;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.OrganizationRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final OrganizationToOrganizationDTOConverter toDTOConverter;
    private final OrganizationDTOToOrganizationConverter toEntityConverter;

    @Override
    @Transactional
    public OrganizationDTO add(OrganizationDTO organizationDTO) throws AppException {
        try {
            organizationDTO.setId(null);

            Organization organization = toEntityConverter.convert(organizationDTO);
            return toDTOConverter.convert(organizationRepository.save(organization));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<OrganizationDTO> addAll(Iterable<OrganizationDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public OrganizationDTO update(Long aLong, OrganizationDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<OrganizationDTO> updateAll(Map<Long, OrganizationDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        try {
            Organization entity = organizationRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            organizationRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<OrganizationDTO> getById(Long id) throws AppException {
        try {
            return organizationRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<OrganizationDTO> findAll(Pageable pageable) throws AppException {
        try {
            return organizationRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return organizationRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
