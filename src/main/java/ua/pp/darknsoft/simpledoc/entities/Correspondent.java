package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.enums.CorrespondentType;
import ua.pp.darknsoft.simpledoc.entities.records.Record;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "correspondent")
public class Correspondent implements Serializable {
    private static final long serialVersionUID = -8940979865884790204L;

    /** Идентификатор записи */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "correspondent_sequence")
    @SequenceGenerator(
            name = "correspondent_sequence",
            sequenceName = "correspondent_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Ссылка на документ содержащего корреспондента
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id")
    private Record record;

    /**
     * Исходящий номер письма корреспондента или вхоящий адресата
     */
    private String outNum;

    /**
     * Исходящая дата письма корреспондента или вхоящий адресата
     */
    @Column(name = "out_date")
    private LocalDate outDate;

    /**
     * Примечание
     */
    @Column(name = "note")
    private String note;

    /**
     * Кто подписал
     */
    @Column(name = "signatory")
    private String signatory;

    /**
     * Ссылка на организацию-корреспондента
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    /**
     * Ссылка на физлицо-корреспондента
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_id")
    private Citizen citizen;

    /**
     * Варианты корреспондентов
     */
    @Enumerated
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "correspondent_type")
    private CorrespondentType correspondentType;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
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
