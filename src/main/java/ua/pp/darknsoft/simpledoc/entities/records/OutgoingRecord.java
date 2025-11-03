package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import ua.pp.darknsoft.simpledoc.entities.Publisher;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "outgoing_record")
@PrimaryKeyJoinColumn(name = "id")
public class OutgoingRecord extends Record {

    /**
     * Візи Підписи Виконавці
     */
    @OneToMany(mappedBy = "record")
    private List<Publisher> publishers;
}
