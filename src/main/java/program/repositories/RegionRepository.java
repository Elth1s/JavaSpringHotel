package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {

}
