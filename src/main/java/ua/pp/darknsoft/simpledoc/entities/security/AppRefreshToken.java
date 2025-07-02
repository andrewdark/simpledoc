package ua.pp.darknsoft.simpledoc.entities.security;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(indexes = @Index(columnList = "refresh_token"))
public class AppRefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_refresh_token_sequence")
    @SequenceGenerator(
            name = "app_refresh_token_sequence",
            sequenceName = "app_refresh_token_id_seq",
            allocationSize = 10
    )
    private Long id;

    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    @Column(name = "ip_address", nullable = false)
    private String ipAddress;

    @Column(name = "browser_fingerprint")
    private String browserFingerprint;

    @Version
    private Long version;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "user_id", unique=true)
    private AppUser appUser;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AppRefreshToken)) return false;

        AppRefreshToken that = (AppRefreshToken) o;

        return appUser.equals(that.appUser);
    }

    @Override
    public int hashCode() {
        return appUser.hashCode();
    }
}
