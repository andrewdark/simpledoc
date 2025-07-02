package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.CitizenCategory;

public interface CitizenCategoryRepository extends JpaRepository<CitizenCategory, Long> {
}
