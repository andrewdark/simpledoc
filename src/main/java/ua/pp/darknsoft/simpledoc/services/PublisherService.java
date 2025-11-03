package ua.pp.darknsoft.simpledoc.services;

import ua.pp.darknsoft.simpledoc.dto.CorrespondentDTO;
import ua.pp.darknsoft.simpledoc.dto.PublisherDTO;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.Publisher;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface PublisherService extends CRUDService<PublisherDTO, Long> {
    Iterable<Publisher> saveAll(Record record, List<PublisherDTO> entityList) throws AppException;
}
