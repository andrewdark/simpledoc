package ua.pp.darknsoft.simpledoc.converters.citizen;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;

@Component
@RequiredArgsConstructor
public class CitizenToCitizenDTOConverter implements Converter<Citizen, CitizenDTO> {

    @Override
    public CitizenDTO convert(Citizen source) {

        CitizenDTO target = CitizenDTO.builder()
                .id(source.getId())
                .fullName(source.getFullName())
                .address(source.getFullName())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        return target;
    }
}
