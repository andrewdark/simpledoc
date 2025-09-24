package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import ua.pp.darknsoft.simpledoc.dto.RecordDTO;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.filters.RecordSearchFilter;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface RecordService extends CRUDService<RecordDTO, Long> {

    RecordDTO add(RecordDTO dto, List<MultipartFile> fileList) throws AppException;
    Page<RecordDTO> getAllByRecordGroupType(Pageable pageable, RecordGroupType type) throws AppException;
    Page<RecordDTO> searchRecords(RecordSearchFilter filter, Pageable pageable) throws AppException;
}
