package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.pp.darknsoft.simpledoc.entities.Department;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @Query("SELECT d FROM Department d WHERE d.parent IS NULL")
    Page<Department> findRootItems(Pageable pageable);

    @Query("""
            SELECT d FROM Department d LEFT JOIN FETCH d.children WHERE d.id = :id
            """)
    Optional<Department> findByIdWithChildren(@Param("id") Long id);

    Page<Department> findAllByDeletedAndOfficialAndNameLikeIgnoreCase(boolean deleted, boolean official, String name, Pageable pageable);
}
