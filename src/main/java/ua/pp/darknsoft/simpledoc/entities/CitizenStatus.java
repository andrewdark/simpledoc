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
@Table(name = "citizen_status")
public class CitizenStatus implements Serializable {
    private static final long serialVersionUID = 3056867703435571803L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "citizen_status_sequence")
    @SequenceGenerator(
            name = "citizen_status_sequence",
            sequenceName = "citizen_status_id_seq",
            allocationSize = 10
    )
    private Long id;

    //TODO: ADD OTHER FIELDS

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
