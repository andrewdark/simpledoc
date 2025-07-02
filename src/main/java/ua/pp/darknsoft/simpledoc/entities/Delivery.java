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
@Table(name = "delivery")
public class Delivery implements Serializable {
    private static final long serialVersionUID = -7994948593975921064L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_sequence")
    @SequenceGenerator(
            name = "delivery_sequence",
            sequenceName = "delivery_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Наименование вида доставки
     */
    private String name;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    private boolean deleted;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
