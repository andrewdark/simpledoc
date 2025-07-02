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

    //TODO: ADD OTHER FIELDS

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
