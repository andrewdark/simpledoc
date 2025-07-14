package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ua.pp.darknsoft.simpledoc.entities.Correspondent;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "citizens_record")
@PrimaryKeyJoinColumn(name = "id")
public class CitizensRecord extends Record{

    /** Признак коллективности письма (Только для писем граждан) */
    @Column(name = "collective")
    private Boolean collective;

    /** Колличество подписей в обращении (Только для писем граждан) */
    @Column(name = "sign_count")
    private Integer signCount;


    /** Перечень кореспондентов (только для входящих и граждан) */
    @OneToMany(mappedBy = "record")
    private List<Correspondent> correspondents;
}
