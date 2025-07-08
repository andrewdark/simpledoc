package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RubricDTO {
    private Long id;
    private String code;
    private String name;
    private Boolean deleted;
    private Boolean node;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private RubricDTO parent;
    private List<RubricDTO> children;
}
