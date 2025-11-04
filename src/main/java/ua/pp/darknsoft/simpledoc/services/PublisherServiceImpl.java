package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.publisher.PublisherDTOToPublisherConverter;
import ua.pp.darknsoft.simpledoc.converters.publisher.PublisherToPublisherDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.PublisherDTO;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.Publisher;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.repositories.PublisherRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PublisherServiceImpl implements PublisherService {

    private final PublisherRepository publisherRepository;
    private final PublisherToPublisherDTOConverter toDTOConverter;
    private final PublisherDTOToPublisherConverter toEntityConverter;
    private final DepartmentService departmentService;

    @Override
    @Transactional
    public PublisherDTO add(PublisherDTO publisherDTO) throws AppException {
        try {
            publisherDTO.setId(null);
            publisherDTO.setDeleted(false);

            Publisher publisher = toEntityConverter.convert(publisherDTO);
            return toDTOConverter.convert(publisherRepository.save(publisher));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<PublisherDTO> addAll(Iterable<PublisherDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public PublisherDTO update(Long id, PublisherDTO newDTO) throws AppException {
        try {
            Publisher entity = publisherRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            Department dep = departmentService.getReferenceById(newDTO.getOfficial().getId());
            entity.setOfficial(dep);
            entity.setSigningDate(newDTO.getSigningDate());
            entity.setNote(newDTO.getNote());
            entity.setPublisherType(newDTO.getPublisherType());

            return toDTOConverter.convert(publisherRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<PublisherDTO> updateAll(Map<Long, PublisherDTO> newDtoMap) throws AppException {
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
            Publisher entity = publisherRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            publisherRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<PublisherDTO> getById(Long id) throws AppException {
        try {
            return publisherRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Page<PublisherDTO> findAll(Pageable pageable) throws AppException {
        try {
            return publisherRepository.findAll(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return publisherRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<Publisher> saveAll(Record record, List<PublisherDTO> dtoList) throws AppException {

        List<Publisher> publishers = dtoList.stream().map(toEntityConverter::convert)
                .peek(el -> el.setId(null))
                .peek(el -> el.setDeleted(false))
                .peek(el -> el.setRecord(record))
                .peek(el -> el.setOfficial(el.getOfficial() != null ? departmentService.getReferenceById(el.getOfficial().getId()) : null))
                .toList();

        return publisherRepository.saveAll(publishers);

    }

    @Override
    public List<Publisher> findAllByRecord(Record record) throws AppException {
        try {
            return publisherRepository.findAllByRecord(record);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
