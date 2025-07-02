package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "citizen")
public class Citizen {
    /**
     * Идентификатор записи
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "citizen_sequence")
    @SequenceGenerator(
            name = "citizen_sequence",
            sequenceName = "citizen_id_seq",
            allocationSize = 10
    )
    private Long id;

    /** Полное имя гражданина. */
    @Column(name = "full_name")
    private String fullName;

    /** Адрес гражданина, куда отправляять письма, а не адрес вопроса. */
    @Column(name = "address")
    private String address;

    /**
     * Признак удаленой записи. Нужен чтобы не удалять полностью документ из базы
     */
    @Column(name="deleted")
    private boolean deleted;

    /** Список социальных статусов гражданина */
//    @ManyToMany
//    @JoinTable(name = "CitizenStatusLink", joinColumns = @JoinColumn(name = "citizen_id"), inverseJoinColumns = @JoinColumn(name = "status_id"))
//    private List<Citizenstatus> status;

    /** Список социальных категорий гражданина */
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
