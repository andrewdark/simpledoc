package ua.pp.darknsoft.simpledoc.services;

import org.springframework.data.jpa.repository.Query;
import ua.pp.darknsoft.simpledoc.dto.PublisherDTO;
import ua.pp.darknsoft.simpledoc.entities.Publisher;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import ua.pp.darknsoft.simpledoc.exceptions.AppException;
import ua.pp.darknsoft.simpledoc.services.base.CRUDService;

import java.util.List;

public interface PublisherService extends CRUDService<PublisherDTO, Long> {
    Iterable<Publisher> saveAll(Record record, List<PublisherDTO> entityList) throws AppException;

    List<Publisher> findAllByRecord(Record record) throws AppException;
}
