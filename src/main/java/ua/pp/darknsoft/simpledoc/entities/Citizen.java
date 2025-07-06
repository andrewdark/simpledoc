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
@Table(name = "citizen")
public class Citizen implements Serializable {
    private static final long serialVersionUID = -1800638145313484296L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "citizen_sequence")
    @SequenceGenerator(
            name = "citizen_sequence",
            sequenceName = "citizen_id_seq",
            allocationSize = 10
    )
    private Long id;

    /**
     * Полное имя гражданина.
     */
    @Column(name = "full_name")
    private String fullName;

    /**
     * Адрес гражданина, куда отправляять письма, а не адрес вопроса.
     */
    @Column(name = "address")
    private String address;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    @Column(name = "deleted")
    private Boolean deleted;

    /** Список социальных статусов гражданина */
//    @ManyToMany
//    @JoinTable(name = "CitizenStatusLink", joinColumns = @JoinColumn(name = "citizen_id"), inverseJoinColumns = @JoinColumn(name = "status_id"))
//    private NavList<Citizenstatus> status;

    /**
     * Список социальных категорий гражданина
     */
//    @ManyToMany
//    @JoinTable(name = "CitizenCategoryLink", joinColumns = @JoinColumn(name = "citizen_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
//    private Set<Citizencategory> category;


    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
