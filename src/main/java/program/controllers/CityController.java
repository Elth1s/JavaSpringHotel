package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import program.dtos.cities.CityDto;
import program.dtos.cities.GetCityDto;
import program.entities.City;
import program.mapper.CityMapper;
import program.mapper.RegionMapper;
import program.repositories.CityRepository;
import program.repositories.RegionRepository;

import java.util.List;
import java.util.Optional;

@Tag(name = "City")
@RestController
@RequestMapping(path = "api/city")
@RequiredArgsConstructor
public class CityController {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @GetMapping("/get-all")
    public List<GetCityDto> getAll() {
        List<GetCityDto> cities = cityMapper.CityListToGetCityDtoList(cityRepository.findAll());
        return cities;
    }

    @PostMapping("/create")
    public City create(CityDto dto) {
        City newCity = cityMapper.CityDtoToCity(dto);
        cityRepository.save(newCity);
        return newCity;
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") int id, CityDto dto) {
        Optional<City> city = cityRepository.findById(id);

        if (city.isPresent()) {
            city.get().setName(dto.getName());
            cityRepository.save(city.get());
            return "City updated.";
        }
        return "Id not found";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") int id) {
        Optional<City> city = cityRepository.findById(id);

        if (city.isPresent()) {
            cityRepository.delete(city.get());
            return "Deleted";
        }
        return "Id not found";
    }
}
