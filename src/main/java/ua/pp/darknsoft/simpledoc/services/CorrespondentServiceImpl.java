package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.correspondent.CorrespondentDTOToCorrespondentConverter;
import ua.pp.darknsoft.simpledoc.converters.correspondent.CorrespondentToCorrespondentDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.repositories.CorrespondentRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CorrespondentServiceImpl implements CorrespondentService {

    private final CorrespondentRepository correspondentRepository;
    private final CorrespondentToCorrespondentDTOConverter toDTOConverter;
    private final CorrespondentDTOToCorrespondentConverter toEntityConverter;
    private final CitizenService citizenService;
    private final OrganizationService organizationService;

    @Override
    @Transactional
    public CorrespondentDTO add(CorrespondentDTO correspondentDTO) throws AppException {
        try {
            correspondentDTO.setId(null);
            correspondentDTO.setDeleted(false);

            Correspondent correspondent = toEntityConverter.convert(correspondentDTO);
            return toDTOConverter.convert(correspondentRepository.save(correspondent));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CorrespondentDTO> addAll(Iterable<CorrespondentDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public CorrespondentDTO update(Long id, CorrespondentDTO newDTO) throws AppException {
        try {
            Correspondent entity = correspondentRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setOutNum(newDTO.getOutNum());
            entity.setOutDate(newDTO.getOutDate());
            entity.setNote(newDTO.getNote());
            entity.setSignatory(newDTO.getSignatory());
            entity.setCorrespondentType(newDTO.getCorrespondentType());

            return toDTOConverter.convert(correspondentRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<CorrespondentDTO> updateAll(Map<Long, CorrespondentDTO> newDtoMap) throws AppException {
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
            Correspondent entity = correspondentRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            correspondentRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<CorrespondentDTO> getById(Long id) throws AppException {
        try {
            return correspondentRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<CorrespondentDTO> findAll(Pageable pageable) throws AppException {
        try {
            return correspondentRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return correspondentRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<Correspondent> saveAll(Record record, List<CorrespondentDTO> dtoList) throws AppException {

        List<Correspondent> correspondents = dtoList.stream().map(toEntityConverter::convert)
                .peek(el -> el.setId(null))
                .peek(el -> el.setDeleted(false))
                .peek(el -> el.setRecord(record))
                .peek(el -> el.setCitizen(el.getCitizen()!=null?citizenService.getReferenceById(el.getCitizen().getId()):null))
                .peek(el -> el.setOrganization(el.getOrganization()!=null?organizationService.getReferenceById(el.getOrganization().getId()):null))
                .toList();

        return correspondentRepository.saveAll(correspondents);

    }
}
