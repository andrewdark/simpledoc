package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
/**
 * @author Prk
 * Справочник. Обозначение состояния исполнения резолюции.
 * Часто используется при закрытии резолюции.
 * Есть часто используемые варианты.
 * <ul>
 * <li>Контроль продлен</li>
 * <li>Рассмотренно положительно</li>
 * <li>Рассмотренно отрицательно</li>
 * <li>Даны разъяснения</li>
 * <li>Возвращено автору</li>
 * <li>Переслано по назначению</li>
 * </ul>
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resolution_category")
public class ResolutionCategory implements Serializable {
    private static final long serialVersionUID = -1459695860564592480L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resolution_category_sequence")
    @SequenceGenerator(
            name = "resolution_category_sequence",
            sequenceName = "resolution_category_id_seq",
            allocationSize = 10
    )
    private Long id;
    /**
     * Текстовое обозначение категории резолюции.
     */
    @Column(name = "name")
    private String name;
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
