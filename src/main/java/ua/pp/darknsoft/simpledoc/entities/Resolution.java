package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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
@Table(name = "resolution")
public class Resolution implements Serializable {
    private static final long serialVersionUID = -3486374283833135761L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resolution_sequence")
    @SequenceGenerator(
            name = "resolution_sequence",
            sequenceName = "resolution_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Ссылка на документ
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id", nullable = false)
    private Record record;

    /**
     * Текст резолюции
     */
    @Column(name = "content")
    private String content;

    /**
     * Автор резолюции
     */
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department author;

    /**
     * Дата наложения резолюции
     */
    @Column(name = "res_date")
    private LocalDate resDate;

    /**
     * Плановая дата исполнения резолюции
     */
    @Column(name = "plan_date")
    private LocalDate planDate;

    /**
     * Фактическая дата исполнения резолюции
     */
    @Column(name = "fact_date")
    private LocalDate factDate;

    /**
     * Основание снятия с контроля
     */
    @Column(name = "resume")
    private String resume;

    /**
     * Ход исполнения
     */
    @Column(name = "summary")
    private String summary;

    /**
     * Состояние исполнения резолюции
     */
    @ManyToOne
    @JoinColumn(name = "resolution_category_id")
    private ResolutionCategory resolutionCategory;

    /** Отчеты исполнителей и сами исполнители */
//    @OneToMany(mappedBy = "Resolution")
//    private Set<Reply> Replays;

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
