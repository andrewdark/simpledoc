package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "incoming_record")
@PrimaryKeyJoinColumn(name = "id")
public class IncomingRecord extends Record{

    /** Перечень кореспондентов (только для входящих и граждан) */
    @OneToMany(mappedBy = "record")
    private List<Correspondent> correspondents;
}
