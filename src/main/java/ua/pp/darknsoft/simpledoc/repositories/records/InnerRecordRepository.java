package ua.pp.darknsoft.simpledoc.repositories.records;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.pp.darknsoft.simpledoc.entities.records.InnerRecord;

public interface InnerRecordRepository extends JpaRepository<InnerRecord, Long>, JpaSpecificationExecutor<InnerRecord> {
}
