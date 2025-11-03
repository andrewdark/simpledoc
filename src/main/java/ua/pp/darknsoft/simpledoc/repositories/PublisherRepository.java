package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
