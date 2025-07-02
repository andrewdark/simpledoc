package ua.pp.darknsoft.simpledoc.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.pp.darknsoft.simpledoc.dto.DeliveryDTO;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.repositories.DeliveryRepository;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService{

    private final DeliveryRepository deliveryRepository;

    @Override
    @Transactional
    public DeliveryDTO add(DeliveryDTO deliveryDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<DeliveryDTO> addAll(Iterable<DeliveryDTO> entityList) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public DeliveryDTO update(Long aLong, DeliveryDTO newDTO) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public Iterable<DeliveryDTO> updateAll(Map<Long, DeliveryDTO> newDtoMap) throws AppException {
        return null;
    }

    @Override
    @Transactional
    public void deleteById(Long aLong) throws AppException {

    }

    @Override
    @Transactional
    public void delete(DeliveryDTO deliveryDTO) throws AppException {

    }

    @Override
    public Optional<DeliveryDTO> getById(Long aLong) throws AppException {
        return Optional.empty();
    }

    @Override
    public Page<DeliveryDTO> findAll(Pageable pageable) throws AppException {
        return null;
    }

    @Override
    public Boolean isExist(DeliveryDTO deliveryDTO) throws AppException {
        return null;
    }
}
