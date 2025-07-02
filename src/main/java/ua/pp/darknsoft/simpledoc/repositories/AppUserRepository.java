package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    Boolean existsByEmail(String email);
    Page<AppUser> findAllByEnabled(Boolean enabled, Pageable pageable);

    @Query("""
            SELECT DISTINCT u FROM AppUser u
                        LEFT JOIN FETCH u.roledUsers roled
                        LEFT JOIN FETCH roled.appRole r
                        WHERE u.id = :userId
            """)
    Optional<AppUser> findUserWithRolesById(@Param("userId") Long userId);

    @Query("""
            SELECT DISTINCT u FROM AppUser u
                        LEFT JOIN FETCH u.roledUsers roled
                        LEFT JOIN FETCH roled.appRole r
                        WHERE u.email = :email
            """)
    Optional<AppUser> findUserWithRolesByEmail(@Param("email") String email);
}
