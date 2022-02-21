package program.dtos.regions;

import lombok.Data;
import program.dtos.cities.CityDto;

import java.util.List;

@Data
public class GetRegionDto {
    private int id;
    private String name;
    private String image;
    private List<CityDto> cities;
}
