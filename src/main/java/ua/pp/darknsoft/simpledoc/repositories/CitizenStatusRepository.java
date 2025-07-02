package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.CitizenStatus;

public interface CitizenStatusRepository extends JpaRepository<CitizenStatus, Long> {
}
