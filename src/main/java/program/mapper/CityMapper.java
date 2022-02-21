package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dtos.cities.CityDto;
import program.dtos.cities.GetCityDto;
import program.entities.City;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {
    @Mapping(source = "name", target = "name")
    City CityDtoToCity(CityDto cityDto);

    CityDto CityToCityDto(City city);

    List<CityDto> CityListToCityDtoList(List<City> city);

    List<GetCityDto> CityListToGetCityDtoList(List<City> cities);
}
