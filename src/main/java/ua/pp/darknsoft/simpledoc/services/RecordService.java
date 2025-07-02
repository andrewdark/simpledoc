package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;
import ua.pp.darknsoft.simpledoc.exception.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

public interface RecordService extends CRUDService<RecordDTO, Long> {
    Page<RecordDTO> getAllByRecordGroupType(Pageable pageable, RecordGroupType type) throws AppException;
}
