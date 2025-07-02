package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.ResolutionCategory;

public interface ResolutionCategoryRepository  extends JpaRepository<ResolutionCategory, Long> {
}
