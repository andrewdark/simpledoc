package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query("""
            SELECT rec FROM Record rec JOIN FETCH rec.recordGroup
            """)
    Page<Record> findAllRecord(Pageable pageable);
    @Query("""
            SELECT rec FROM IncomingRecord rec JOIN FETCH rec.recordGroup
            """)
    Page<Record> findAllIncomingRecord(Pageable pageable);
    @Query("""
            SELECT rec FROM CitizensRecord rec JOIN FETCH rec.recordGroup
            """)
    Page<Record> findAllCitizensRecord(Pageable pageable);
    @Query("""
            SELECT rec FROM OutgoingRecord rec JOIN FETCH rec.recordGroup
            """)
    Page<Record> findAllOutgoingRecord(Pageable pageable);
    @Query("""
            SELECT rec FROM InnerRecord rec JOIN FETCH rec.recordGroup
            """)
    Page<Record> findAllInnerRecord(Pageable pageable);
}
