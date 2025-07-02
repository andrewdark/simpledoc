package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

public interface RubricRepository  extends JpaRepository<Rubric, Long> {
}
