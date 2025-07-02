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
@Table(name = "citizen_category")
public class CitizenCategory implements Serializable {
    private static final long serialVersionUID = -3597602172012857345L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "citizen_category_sequence")
    @SequenceGenerator(
            name = "citizen_category_sequence",
            sequenceName = "citizen_category_id_seq",
            allocationSize = 10
    )
    private Long id;

    //TODO: ADD OTHER FIELDS

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
