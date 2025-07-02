package ua.pp.darknsoft.simpledoc.entities.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "app_user", uniqueConstraints = {@UniqueConstraint(name = "APP_USER_UC", columnNames = "email")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_sequence")
    @SequenceGenerator(
            name = "app_user_sequence",
            sequenceName = "app_user_id_seq",
            allocationSize = 10
    )
    private Long id;

    @Column(name = "first_name", length = 36, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 36, nullable = false)
    private String lastName;

    @Column(name = "email", length = 36, nullable = false)
    private String email;

    @Column(name = "encrypted_password", length = 128, nullable = false)
    @JsonIgnore
    private String encryptedPassword;
    @Column(name = "enabled", nullable = false)
    private Boolean enabled = true;
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "appUser")
    private Set<RoledUser> roledUsers = new HashSet<>();
}
