package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.security.AppRole;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
}
