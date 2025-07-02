package ua.pp.darknsoft.simpledoc.entities.security;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "app_role", uniqueConstraints = {@UniqueConstraint(name = "APP_ROLE_UC", columnNames = "role_name")})
public class AppRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_role_sequence")
    @SequenceGenerator(
            name = "app_role_sequence",
            sequenceName = "app_role_id_seq",
            allocationSize = 10
    )
    private Long id;
    @Column(name = "role_name", length = 36, nullable = false)
    @Pattern.List({
            @Pattern(regexp = "^ROLE_[A-Z0-9]{2,36}$"),
            @Pattern(regexp = "^[A-Z]")
    })
    private String roleName;
    @Version
    private Long version;
    @OneToMany(mappedBy = "appRole")
    private Set<RoledUser> roledUsers = new HashSet<>();
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
