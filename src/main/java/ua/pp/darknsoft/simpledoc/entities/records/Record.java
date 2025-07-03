package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.context.annotation.Lazy;
import ua.pp.darknsoft.simpledoc.entities.Delivery;
import ua.pp.darknsoft.simpledoc.entities.RecordGroup;
import ua.pp.darknsoft.simpledoc.entities.Rubric;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@SuperBuilder
@Table(name = "record")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Record implements Serializable {
    private static final long serialVersionUID = 908771635616694112L;

    /** Идентификатор записи */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "record_sequence")
    @SequenceGenerator(
            name = "record_sequence",
            sequenceName = "record_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Журнал(Группа документов в котором регистрируются документы
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_group_id", nullable = false)
    private RecordGroup recordGroup;

    /**
     * Порядковая часть номера документа
     */
    @Column(name = "order_num")
    private Long orderNum;

    /**
     * Регистрационный номер документа
     */
    @Column(name = "reg_num")
    private String regNum;

    /**
     * Дата регистрации документа
     */
    @Column(name = "reg_date")
    private LocalDate regDate;

    /**
     * Состав/колличество листов
     */
    @Column(name = "consist")
    private String consist;

    /**
     * Краткое содержание
     */
    @Column(name = "content")
    private String content;

    /**
     * Примечание
     */
    @Column(name = "note")
    private String note;

    /**
     * Вид доставки
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    /** Рубрикатор */
//    @ManyToMany
//    private NavList<Rubric> rubrics;

    /** Резолюции наложенные на документ */
    //@OneToMany(mappedBy = "record")
    //private NavList<Resolution> resolutions;

    /** Файлы прикрепленные к документу */
    //@OneToMany(mappedBy = "Document")
    //private NavList<FileLink> files;



    /**
     * Связки с другими документами
     */
    //@OneToMany(mappedBy = "Document")
    //protected Set<LinkRecord> links;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
