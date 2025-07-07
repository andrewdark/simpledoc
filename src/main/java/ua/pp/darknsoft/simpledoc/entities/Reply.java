package ua.pp.darknsoft.simpledoc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;
import ua.pp.darknsoft.simpledoc.entities.enums.ReplyType;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reply")
public class Reply implements Serializable {
    private static final long serialVersionUID = -2059650748545250243L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reply_sequence")
    @SequenceGenerator(
            name = "reply_sequence",
            sequenceName = "reply_id_seq",
            allocationSize = 10
    )
    private Long id;

    /** Ссылка на резолюцию содержащих ответы/исполнителей */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resolution_id")
    private Resolution resolution;

    /** Дата отчета */
    @Column(name = "reply_date")
    private LocalDate replyDate;

    /** Варианты ответа */
    @Enumerated
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "reply_type")
    private ReplyType replyType;

    /** Ссылка на исполнителя */
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department executor;

    @Column(name = "content")
    private String content;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
