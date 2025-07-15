package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Citizen;

public interface CitizenRepository extends JpaRepository<Citizen, Long>{
}
