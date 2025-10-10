package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.dto.DeliveryDTO;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

public interface DeliveryService extends CRUDService<DeliveryDTO, Long> {
    Delivery getReference(Long deliveryId);
}
