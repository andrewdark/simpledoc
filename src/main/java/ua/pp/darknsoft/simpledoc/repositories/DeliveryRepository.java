package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Delivery;

public interface DeliveryRepository  extends JpaRepository<Delivery, Long> {
}
