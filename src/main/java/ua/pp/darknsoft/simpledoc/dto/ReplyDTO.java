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
    private Resolution resolution;
    private LocalDate replyDate;
    private ReplyType replyType;
    private Department executor;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
