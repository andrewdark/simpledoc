package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface CorrespondentService extends CRUDService<CorrespondentDTO, Long> {

    Iterable<Correspondent> saveAll(Record record, List<CorrespondentDTO> entityList) throws AppException;
}
