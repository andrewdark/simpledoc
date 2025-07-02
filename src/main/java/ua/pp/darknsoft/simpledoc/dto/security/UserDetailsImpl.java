package ua.pp.darknsoft.simpledoc.dto.security;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ua.pp.darknsoft.simpledoc.entities.security.AppRole;
import ua.pp.darknsoft.simpledoc.entities.security.AppUser;
import ua.pp.darknsoft.simpledoc.entities.security.RoledUser;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private Collection<AppRole> roles;

    public UserDetailsImpl(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;

    }
    public UserDetailsImpl(Long id, String username, String password, Collection<AppRole> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;

    }

    public static UserDetailsImpl build(AppUser user) {

        if (user != null && user.getRoledUsers() != null) {
            List<AppRole> roles = user.getRoledUsers().stream().map(RoledUser::getAppRole).toList();
            return new UserDetailsImpl(user.getId(), user.getEmail(), user.getEncryptedPassword(), roles);
        } else {
            return new UserDetailsImpl(user.getId(), user.getEmail(), user.getEncryptedPassword());
        }

    }

    public Long getId() {
        return id;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.roles == null || this.roles.isEmpty()) {
            return Collections.emptyList();
        }
        return this.roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName())) // Используем имя роли
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
