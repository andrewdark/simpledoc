package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ua.pp.darknsoft.simpledoc.entities.Department;
import ua.pp.darknsoft.simpledoc.entities.Publisher;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "inner_record")
@PrimaryKeyJoinColumn(name = "id")
public class InnerRecord extends Record{
    /**
     * Візи Підписи Виконавці
     */
    @OneToMany(mappedBy = "record")
    private List<Publisher> publishers;
}
