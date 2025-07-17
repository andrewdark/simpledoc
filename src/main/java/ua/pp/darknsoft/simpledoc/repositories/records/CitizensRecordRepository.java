package ua.pp.darknsoft.simpledoc.repositories.records;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ua.pp.darknsoft.simpledoc.entities.records.CitizensRecord;

public interface CitizensRecordRepository extends JpaRepository<CitizensRecord, Long>, JpaSpecificationExecutor<CitizensRecord> {
}
