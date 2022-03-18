package program.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "roles")
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<AppUser> users;

    public AppRole() {
        users = new ArrayList<AppUser>();
    }

    public AppRole(String name) {
        this.name = name;
        users = new ArrayList<AppUser>();
    }
}
