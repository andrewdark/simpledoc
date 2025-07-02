package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.pp.darknsoft.simpledoc.entities.Delivery;


public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    @Query("""
            SELECT d FROM Delivery d WHERE d.deleted = false 
            """)
    Page<Delivery> findAllNotDeleted(Pageable pageable);
}
