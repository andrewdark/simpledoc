package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

public interface CorrespondentRepository extends JpaRepository<Correspondent, Long> {
}
