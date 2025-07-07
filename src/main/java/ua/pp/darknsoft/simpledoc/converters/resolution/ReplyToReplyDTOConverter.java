package ua.pp.darknsoft.simpledoc.converters.resolution;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ua.pp.darknsoft.simpledoc.dto.ReplyDTO;
import ua.pp.darknsoft.simpledoc.entities.Reply;

@Component
public class ReplyToReplyDTOConverter implements Converter<Reply, ReplyDTO> {
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
        if (source.getExecutor() != null) {
            target.setExecutor(source.getExecutor());
        }
        return target;
    }
}
