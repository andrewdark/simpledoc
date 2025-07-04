package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;

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
@Table(name = "department")
public class Department implements Serializable {
    private static final long serialVersionUID = -8551242211985208681L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "department_sequence")
    @SequenceGenerator(
            name = "department_sequence",
            sequenceName = "department_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Наименование подразделения или Имя должностного лица
     */
    private String name;

    /**
     * Должность
     */
    private String position;

    /**
     * Признак должностного лица
     */
    private Boolean official;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    private Boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Department parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Department> children = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;
    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
