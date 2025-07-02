package ua.pp.darknsoft.simpledoc.entities.records;

import jakarta.persistence.Column;
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
    //@OneToMany(mappedBy = "Document")
    //private Set<Correspondent> Correspondents;
}
