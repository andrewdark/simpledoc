package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Citizen;

import java.util.List;

public interface CitizenRepository extends JpaRepository<Citizen, Long>{
    List<Citizen> findByIdIn(List<Long> ids);
    Page<Citizen> findAllByDeletedAndFullNameLikeIgnoreCase(boolean deleted, String name, Pageable pageable);
}
