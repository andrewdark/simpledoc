package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;

import java.util.List;
import java.util.Optional;

public interface RecordGroupRepository extends JpaRepository<RecordGroup, Long> {
    @Query("SELECT rg FROM RecordGroup rg WHERE rg.parent IS NULL")
    Page<RecordGroup> findRootItems(Pageable pageable);

    @Query("""
            SELECT rg FROM RecordGroup rg LEFT JOIN FETCH rg.children WHERE rg.id = :id
            """)
    Optional<RecordGroup> findByIdWithChildren(@Param("id") Long id);
}
