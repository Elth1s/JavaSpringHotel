package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.AppRole;

@Repository
public interface RoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findByName(String Name);
}