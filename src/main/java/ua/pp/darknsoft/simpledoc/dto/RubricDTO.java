package ua.pp.darknsoft.simpledoc.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class RubricDTO {
    private Long id;
    private String code;
    private String name;
    private Boolean deleted;
    private Boolean node;
    private Rubric parent;
    private List<Rubric> children;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
