package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.repository.CrudRepository;
import ua.pp.darknsoft.simpledoc.entities.security.RoledUser;

public interface RoledUserRepository extends CrudRepository<RoledUser, RoledUser.Id> {
}
