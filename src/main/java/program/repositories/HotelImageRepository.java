package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.City;
import program.entities.HotelImage;

import java.util.List;

@Repository
public interface HotelImageRepository extends JpaRepository<HotelImage, Integer> {
    List<HotelImage> findByName(String name);

    List<HotelImage> findByHotelId(Integer hotelId);
}
