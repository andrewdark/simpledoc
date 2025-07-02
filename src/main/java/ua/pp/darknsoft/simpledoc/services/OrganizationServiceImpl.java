package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.OrganizationDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.OrganizationRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService{

    private final OrganizationRepository organizationRepository;

    @Override
    @Transactional
    public OrganizationDTO add(OrganizationDTO organizationDTO) throws AppException {
        return null;
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
    public void softDeleteById(Long organizationDTO) throws AppException {

    }

    @Override
    public Optional<OrganizationDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<OrganizationDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(OrganizationDTO organizationDTO) throws AppException {
        return null;
    }
}
