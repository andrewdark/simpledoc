package ua.pp.darknsoft.simpledoc.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.converters.delivery.DeliveryDTOToDeliveryConverter;
import ua.pp.darknsoft.simpledoc.converters.delivery.DeliveryToDeliveryDTOConverter;
import ua.pp.darknsoft.simpledoc.dto.DeliveryDTO;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.DeliveryRepository;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DeliveryDTOToDeliveryConverter toEntityConverter;
    private final DeliveryToDeliveryDTOConverter toDTOConverter;

    @Override
    @Transactional
    public DeliveryDTO add(DeliveryDTO deliveryDTO) throws AppException {
        try {
            deliveryDTO.setId(null);
            deliveryDTO.setDeleted(false);
            Delivery delivery = toEntityConverter.convert(deliveryDTO);
            return toDTOConverter.convert(deliveryRepository.save(delivery));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<DeliveryDTO> addAll(Iterable<DeliveryDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public DeliveryDTO update(Long id, DeliveryDTO newDTO) throws AppException {
        try {
            Delivery entity = deliveryRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setName(newDTO.getName());
            return toDTOConverter.convert(deliveryRepository.save(entity));
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public Iterable<DeliveryDTO> updateAll(Map<Long, DeliveryDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long id) throws AppException {
        try {
           deliveryRepository.deleteById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    @Transactional
    public void softDeleteById(Long id) throws AppException {
        try {
            Delivery entity = deliveryRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

            entity.setDeleted(true);
            deliveryRepository.save(entity);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Optional<DeliveryDTO> getById(Long id) throws AppException {
        try {
            return deliveryRepository.findById(id).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }

    }

    @Override
    public Page<DeliveryDTO> findAll(Pageable pageable) throws AppException {
        try {
            return deliveryRepository.findAllNotDeleted(pageable).map(toDTOConverter::convert);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }

    @Override
    public Boolean isExistById(Long id) throws AppException {
        try {
            return deliveryRepository.existsById(id);
        } catch (Exception ex) {
            throw new AppException(ex);
        }
    }
}
