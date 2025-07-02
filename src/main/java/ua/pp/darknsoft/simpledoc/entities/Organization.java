package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "organization", uniqueConstraints = {@UniqueConstraint(name = "organization_uc", columnNames = "code")})
public class Organization implements Serializable {
    /**
     * Идентификатор записи
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rubric_sequence")
    @SequenceGenerator(
            name = "rubric_sequence",
            sequenceName = "rubric_id_seq",
            allocationSize = 10
    )
    private Long id;

    /** Название организации */
    @Column(name = "name")
    private String name;

    /** Код ЕДРПОУ или ОКПО */
    @Column(name = "code")
    private String code;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    @Column(name = "deleted")
    private boolean deleted;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
