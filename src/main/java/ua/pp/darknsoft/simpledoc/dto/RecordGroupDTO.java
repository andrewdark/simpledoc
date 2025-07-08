package ua.pp.darknsoft.simpledoc.dto;

import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordGroupDTO {
    private Long id;
    private String name;
    private Boolean node;
    private RecordGroupType recordGroupType;
    private String indexNum;
    private String templateNum;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private RecordGroupDTO parent;
    private List<RecordGroupDTO> children;
}
