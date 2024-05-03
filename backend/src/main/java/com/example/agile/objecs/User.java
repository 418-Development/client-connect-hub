package com.example.agile.objecs;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;

import static com.example.agile.utils.HashUtil.sha256Hex;

@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User implements Comparable<User> {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Setter
    @Getter
    @NotBlank
    @Size(max = 100)
    private String gravatar;

    @NotBlank
    @Size(max = 120)
    private String password;

    @Setter
    @NotBlank
    @Size(max = 50)
    private String label;

    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private Set<Project> projects;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany
    @JoinTable(
            name = "user_post",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    private Set<Post> posts = new HashSet<>();

    public User(String username) {
        this.username = username;
    }

    public User(String username, String email, String password) {
        this.username = username;
        setEmail(email);
        this.password = password;
        this.label = "new";
    }

    public User() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        this.gravatar = sha256Hex(email.toLowerCase());
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLabel() {
        return label;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Project> getProjects() {
        return projects;
    }


    @Override
    public int compareTo(User other) {
        ERole roles = this.roles.stream()
                .map(Role::getName)
                .max(Comparator.naturalOrder())
                .orElse(ERole.ROLE_CLIENT);

        ERole otherRoles = other.roles.stream()
                .map(Role::getName)
                .max(Comparator.naturalOrder())
                .orElse(ERole.ROLE_CLIENT);

        if(roles.ordinal() > otherRoles.ordinal()){
            return -1;
        }else if(roles.ordinal() < otherRoles.ordinal()){
            return 1;
        }else {
           return getUsername().compareTo(other.getUsername());
        }
    }
}
