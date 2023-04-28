package com.deokma.offvirt.models;

import com.deokma.offvirt.models.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

/**
 * @author Denis Popolamov
 */
@Entity
@Table(name = "usr")
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "username", unique = true)
    @NotEmpty(message = "Name should not be empty")
    @Size(min = 2, max = 30, message = "Name should be between 2 and 30 characters")
    private String username;
    @Column(name = "firstname")
    @NotEmpty(message = "Firstname should not be empty")
    @Size(min = 2, max = 30, message = "Name should be between 2 and 30 characters")
    private String firstname;
    @Column(name = "lastname")
    @NotEmpty(message = "Lastname should not be empty")
    @Size(min = 2, max = 30, message = "Name should be between 2 and 30 characters")
    private String lastname;
    @Column(name = "email")
    @NotEmpty(message = "Email should not be empty")
    private String email;
    @Column(name = "active")
    private boolean active;
    //@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "avatar")
    private String avatar;
    @Column(name = "password")
    @Size(min = 3, message = "Password may be min 3 characters")
    private String password;
    // User books
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

//    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    @JoinTable(name = "user_books",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "book_id")
//    )
   // private List<Books> books_list = new ArrayList<>();

    //@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    //private AvatarImage avatarImage;


    public User(Long id, String username, String firstname, String lastname, String email, boolean active, String avatar, String password, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.active = active;
        this.avatar = avatar;
        this.password = password;
        this.roles = roles;
    }

    public boolean isAdmin() {
        return roles.contains(Role.ADMIN);
    }

    public User() {
    }

    public class CurrentUser {
        private User user;

        public CurrentUser(User user) {
            this.user = user;
        }

        public User getUser() {
            return user;
        }
    }

    //security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return null;
    }

    public void setUsername(String username) {
        this.username = username;
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
        return active;
    }

}
