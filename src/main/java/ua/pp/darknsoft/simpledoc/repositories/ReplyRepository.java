package ua.pp.darknsoft.simpledoc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.pp.darknsoft.simpledoc.entities.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
