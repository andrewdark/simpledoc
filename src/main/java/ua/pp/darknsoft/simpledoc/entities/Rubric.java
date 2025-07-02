package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "rubric")
public class Rubric implements Serializable {
    private static final long serialVersionUID = 4834180509833455741L;

    /** Идентификатор записи */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rubric_sequence")
    @SequenceGenerator(
            name = "rubric_sequence",
            sequenceName = "rubric_id_seq",
            allocationSize = 10
    )
    private Long id;

    /** Код тематики вопроса (В некоторіх случаях обязательное) */
    @Column(name = "code")
    private String code;

    /** Наименование рубрики */
    @Column(name = "name")
    private String name;

    /** Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы */
    @Column(name = "deleted")
    private boolean deleted;

    /** Признак елемента выбора. Лист */
    @Column(name = "node")
    private boolean node;

    /** Ссылка на родительскую папку */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Rubric parent;

    /** Перечень дочерних рубрик */
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Rubric> children;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
