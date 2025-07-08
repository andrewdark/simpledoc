package ua.pp.darknsoft.simpledoc.converters.citizen;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.CitizenDTO;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;
import ua.pp.darknsoft.simpledoc.entities.CitizenStatus;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class CitizenDTOToCitizenConverter implements Converter<CitizenDTO, Citizen> {
    @Override
    public Citizen convert(CitizenDTO source) {
        Citizen target = Citizen.builder()
                .id(source.getId())
                .fullName(source.getFullName())
                .address(source.getAddress())
                .deleted(source.getDeleted())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();
//        if(source.getStatus() !=null && !source.getStatus().isEmpty()){
//
//        }
//        if(source.getStatus() !=null && !source.getStatus().isEmpty()){
//
//        }

        return target;
    }
}
