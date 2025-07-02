package ua.pp.darknsoft.simpledoc.dto;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.*;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDTO {
    private Long id;
    private RecordGroupDTO recordGroup;
    private Long orderNum;
    private String regNum;
    private LocalDate regDate;
    private String consist;
    private String content;
    private String note;
    private DeliveryDTO delivery;
    private Boolean collective;
    private Integer signCount;

    private List<ResolutionDTO> resolutions;
    private List<FileLinkDTO> files;
    private List<RubricDTO> rubrics;
    private List<LinkRecordDTO> links;
}
