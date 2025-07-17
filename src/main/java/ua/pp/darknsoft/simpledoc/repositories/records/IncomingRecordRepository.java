package ua.pp.darknsoft.simpledoc.repositories.records;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.pp.darknsoft.simpledoc.entities.records.IncomingRecord;

public interface IncomingRecordRepository extends JpaRepository<IncomingRecord, Long>, JpaSpecificationExecutor<IncomingRecord> {
}
