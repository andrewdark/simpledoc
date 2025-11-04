package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.util.List;

public interface CorrespondentRepository extends JpaRepository<Correspondent, Long> {

    @Query("""
            SELECT cor FROM Correspondent cor LEFT JOIN FETCH cor.citizen 
            LEFT JOIN FETCH cor.organization 
            WHERE cor.record= :record
            """)
    List<Correspondent> findCorrespondentByRecord(Record record);
}
