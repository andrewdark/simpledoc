package ua.pp.darknsoft.simpledoc.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.ResolutionCategory;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResolutionDTO {
    private Long id;
    private Record record;
    private String content;
    private Department author;
    private LocalDate resDate;
    private LocalDate planDate;
    private LocalDate factDate;
    private String resume;
    private String summary;
    private ResolutionCategory resolutionCategory;
    private List<ReplyDTO> replays;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
