package ua.pp.darknsoft.simpledoc.converters.resolution;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnitUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ReplyDTO;
import ua.pp.darknsoft.simpledoc.entities.Reply;

@Component
@RequiredArgsConstructor
public class ReplyToReplyDTOConverter implements Converter<Reply, ReplyDTO> {
    private final EntityManagerFactory entityManagerFactory;
    @Override
    public ReplyDTO convert(Reply source) {
        ReplyDTO target = ReplyDTO.builder()
                .id(source.getId())
                .replyDate(source.getReplyDate())
                .replyType(source.getReplyType())
                .executor(source.getExecutor())
                .content(source.getContent())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();

        PersistenceUnitUtil util = entityManagerFactory.getPersistenceUnitUtil();
        if (source.getExecutor() != null && util.isLoaded(source.getExecutor())) {
            target.setExecutor(source.getExecutor());
        }

        return target;
    }
}
