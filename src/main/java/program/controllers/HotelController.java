package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dtos.cities.CityDto;
import program.dtos.cities.GetCityDto;
import program.dtos.hotels.HotelDto;
import program.entities.City;
import program.entities.Hotel;
import program.entities.HotelImage;
import program.mapper.CityMapper;
import program.mapper.HotelMapper;
import program.repositories.CityRepository;
import program.repositories.HotelImageRepository;
import program.repositories.HotelRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Tag(name = "Hotel")
@RestController
@RequestMapping(path = "api/hotel")
@RequiredArgsConstructor
public class HotelController {
    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImageRepository;
    private final HotelMapper hotelMapper;

    /*@GetMapping("/get-all")
    public List<GetCityDto> getAll() {
        List<GetCityDto> cities = cityMapper.CityListToGetCityDtoList(cityRepository.findAll());
        return cities;
    }*/

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody HotelDto dto) throws IOException {
        Hotel newHotel = hotelMapper.HotelDtoToHotel(dto);
        hotelRepository.save(newHotel);

        for (String name : dto.getImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            HotelImage image = images.get(0);
            image.setHotel(newHotel);
            hotelImageRepository.save(image);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }
}
