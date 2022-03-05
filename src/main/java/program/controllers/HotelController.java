package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dtos.cities.CityDto;
import program.dtos.cities.GetCityDto;
import program.dtos.hotels.HotelDto;
import program.dtos.hotels.HotelUpdateDto;
import program.dtos.hotels.HotelWithImagesDto;
import program.entities.City;
import program.entities.Hotel;
import program.entities.HotelImage;
import program.entities.Region;
import program.mapper.CityMapper;
import program.mapper.HotelMapper;
import program.repositories.CityRepository;
import program.repositories.HotelImageRepository;
import program.repositories.HotelRepository;
import program.storage.StorageService;

import javax.persistence.EntityNotFoundException;
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
    private final StorageService storageService;

    @GetMapping("/get-all")
    public ResponseEntity<List<HotelWithImagesDto>> getAll() {
        List<HotelWithImagesDto> hotels = hotelMapper.HotelListToHotelWithImagesDtoList(hotelRepository.findAll());
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));

        HotelWithImagesDto temp = hotelMapper.HotelToHotelWithImagesDto(hotel);

        return ResponseEntity.ok(temp);
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody HotelDto dto) throws IOException {
        Hotel newHotel = hotelMapper.HotelDtoToHotel(dto);
        hotelRepository.save(newHotel);

        for (String name : dto.getImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            HotelImage image = images.get(0);
            image.setHotelId(newHotel.getId());
            image.setHotel(newHotel);
            hotelImageRepository.save(image);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);

        if (hotel.isPresent()) {
            List<HotelImage> images = hotelImageRepository.findByHotelId(id);

            for (HotelImage hotelImage : images) {
                storageService.delete(hotelImage.getName());
                hotelImageRepository.delete(hotelImage);
            }

            hotelRepository.delete(hotel.get());
            return ResponseEntity.ok("Deleted");
        }
        return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity update(@PathVariable("id") int id, @RequestBody HotelUpdateDto dto) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));

        hotel.setName(dto.getName());
        hotel.setDescription(dto.getDescription());
        hotelRepository.save(hotel);
        for (String name : dto.getUploadImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            HotelImage image = images.get(0);
            image.setHotelId(hotel.getId());
            image.setHotel(hotel);
            hotelImageRepository.save(image);
        }
        for (String name : dto.getDeleteImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            HotelImage image = images.get(0);
            hotelImageRepository.delete(image);
            storageService.delete(image.getName());
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
