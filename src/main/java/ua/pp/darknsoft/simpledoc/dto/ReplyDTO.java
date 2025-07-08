package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.Resolution;
import ua.pp.darknsoft.simpledoc.entities.enums.ReplyType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyDTO {
    private Long id;
    private LocalDate replyDate;
    private ReplyType replyType;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Resolution resolution;
    private Department executor;
}
