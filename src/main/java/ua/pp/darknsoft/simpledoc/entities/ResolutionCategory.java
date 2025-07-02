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

    //TODO: ADD OTHER FIELDS

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
