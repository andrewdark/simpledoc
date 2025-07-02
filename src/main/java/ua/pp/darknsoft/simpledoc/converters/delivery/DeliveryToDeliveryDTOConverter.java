package ua.pp.darknsoft.simpledoc.converters.delivery;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.DeliveryDTO;
import ua.pp.darknsoft.simpledoc.entities.Delivery;

@Component
public class DeliveryToDeliveryDTOConverter implements Converter<Delivery, DeliveryDTO> {
    @Override
    public DeliveryDTO convert(Delivery source) {
        return DeliveryDTO.builder()
                .id(source.getId())
                .name(source.getName())
                .deleted(source.getDeleted())
                .build();
    }
}
