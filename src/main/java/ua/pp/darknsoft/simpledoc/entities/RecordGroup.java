package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.enums.RecordGroupType;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "record_group")
public class RecordGroup implements Serializable {
    private static final long serialVersionUID = -8556100167510411343L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "record_group_sequence")
    @SequenceGenerator(
            name = "record_group_sequence",
            sequenceName = "record_group_id_seq",
            allocationSize = 10
    )
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Признак елемента выбора. Лист
     */
    @Column(name = "node")
    private Boolean node;

    @Column(name = "record_group_type", nullable = false)
    @Enumerated
    @JdbcType(PostgreSQLEnumJdbcType.class)
    RecordGroupType recordGroupType;

    /**
     * Индекс по номенклатуре. Необходим для генерации номера
     */
    @Column(name = "index_num")
    private String indexNum;

    /**
     * Шаблон для генерации номера
     */
    @Column(name = "template_num")
    private String templateNum;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    @Column(name = "deleted")
    private Boolean deleted;

    /**
     * Самоссылающаяся связь для родительской категории
     * ManyToOne: Много подкатегорий могут принадлежать одной родительской категории
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id") // fk in table record_group
    private RecordGroup parent;

    /**
     * Связь OneToMany для дочерних подкатегорий
     * OneToMany: Одна категория может иметь много дочерних подкатегорий
     * mappedBy указывает на поле "parent" в сущности Subcategory, которое управляет связью
     * CascadeType.ALL означает, что операции (persist, merge, remove) будут каскадироваться на дочерние элементы
     */
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecordGroup> children = new ArrayList<>();

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
