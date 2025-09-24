package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Organization;


public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Page<Organization> findAllByDeletedAndNameLikeIgnoreCase(boolean deleted, String name, Pageable pageable);
}
