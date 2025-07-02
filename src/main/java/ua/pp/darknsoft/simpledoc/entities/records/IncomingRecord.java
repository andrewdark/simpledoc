package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "incoming_record")
@PrimaryKeyJoinColumn(name = "id")
public class IncomingRecord extends Record{

    /** Перечень кореспондентов (только для входящих и граждан) */
    //@OneToMany(mappedBy = "Document")
    //private Set<Correspondent> Correspondents;
}
