package ua.pp.darknsoft.simpledoc.dto;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.enums.PublisherType;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PublisherDTO {
    private Long id;
    private RecordDTO record;
    private LocalDate signingDate;
    private DepartmentDTO official;
    private String note;
    private PublisherType publisherType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
