package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ua.pp.darknsoft.simpledoc.entities.Department;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "inner_record")
@PrimaryKeyJoinColumn(name = "id")
public class InnerRecord extends Record{
    /** Исполнитель документа (Только для исходящих и внутреней документации) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department executor;

    /** Визы и Подписи */
    // @OneToMany(mappedBy = "Document")
    //private Set<Vise> Vises;
}
