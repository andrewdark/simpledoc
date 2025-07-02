package ua.pp.darknsoft.simpledoc.entities.security;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "role_user")
@org.hibernate.annotations.Immutable
public class RoledUser implements Serializable {

    @Embeddable
    public static class Id implements Serializable {

        @Column(name = "user_id")
        protected Long userId;
        @Column(name = "role_id")
        protected Long roleId;

        public Id() {
        }

        public Id(Long userId, Long roleId) {
            this.userId = userId;
            this.roleId = roleId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Id)) return false;
            Id id = (Id) o;
            return userId.equals(id.userId) &&
                    roleId.equals(id.roleId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, roleId);
        }
    }

    @EmbeddedId
    private Id id = new Id();
    @Column(updatable = false, nullable = false)
    private LocalDateTime addedOn = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private AppRole appRole;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private AppUser appUser;

    public RoledUser() {
    }

    public RoledUser(AppRole appRole, AppUser appUser) {
        //SET values to the Classes fields.
        this.appUser = appUser;
        this.appRole = appRole;
        //Set the values to the Identificator.
        this.id.roleId = appRole.getId();
        this.id.userId = appUser.getId();
        //Ensures referential integrity if the connection is bidirectional.
        appRole.getRoledUsers().add(this);
        appUser.getRoledUsers().add(this);
    }

    public Id getId() {
        return id;
    }

    public LocalDateTime getAddedOn() {
        return addedOn;
    }

    public AppRole getAppRole() {
        return appRole;
    }

    public AppUser getAppUser() {
        return appUser;
    }
}
