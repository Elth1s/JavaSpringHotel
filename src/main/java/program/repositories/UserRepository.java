package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
