package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.enums.PublisherType;
import ua.pp.darknsoft.simpledoc.entities.records.Record;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "publisher")
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "publisher_sequence")
    @SequenceGenerator(
            name = "publisher_sequence",
            sequenceName = "publisher_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Посилання на підписаний документ
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id", nullable = false)
    private Record record;

    /**
     * Дата візування
     */
    @Column(name = "signing_date")
    private LocalDate signingDate;

    /**
     * Посилання на посадову особу, яка підписала документ
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department official;

    /**
     * Примітка підписанта.
     */
    private String note;

    /**
     * Тип підписанта: Підписав/Візував/Виконав
     */
    @Enumerated
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "publisher_type")
    private PublisherType publisherType;

    @Column(name = "deleted")
    private Boolean deleted;
    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
