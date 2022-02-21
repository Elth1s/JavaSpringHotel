package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

}
