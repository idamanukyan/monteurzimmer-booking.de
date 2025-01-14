package de.monteurzimmer.monteurzimmer_booking.user_management.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "roles_users")
public class RoleUser {

    @EmbeddedId
    private RoleUserId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleId")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    public RoleUserId getId() {
        return id;
    }

    public void setId(RoleUserId id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Embeddable
    public static class RoleUserId implements Serializable {
        @Column(name = "role_id")
        private Long roleId;

        @Column(name = "user_id")
        private Long userId;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            RoleUserId that = (RoleUserId) o;
            return Objects.equals(roleId, that.roleId) && Objects.equals(userId, that.userId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(roleId, userId);
        }
    }
}

