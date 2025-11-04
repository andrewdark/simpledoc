package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.pp.darknsoft.simpledoc.entities.Publisher;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.util.List;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    @Query("""
            SELECT pub FROM Publisher pub JOIN FETCH pub.official 
            WHERE pub.record= :record
            """)
    List<Publisher> findAllByRecord(Record record);
}
