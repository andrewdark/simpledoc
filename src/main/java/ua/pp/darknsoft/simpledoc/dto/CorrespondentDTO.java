package ua.pp.darknsoft.simpledoc.dto;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.Citizen;
import ua.pp.darknsoft.simpledoc.entities.Organization;
import ua.pp.darknsoft.simpledoc.entities.enums.CorrespondentType;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrespondentDTO {
    private Long id;
    private Record record;
    private String outNum;
    private LocalDate outDate;
    private String note;
    private String signatory;
    private Organization Organization;
    private Citizen citizen;
    private CorrespondentType correspondentType;
    private Boolean deleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
