package program.dtos.cities;

import lombok.Data;
import program.dtos.regions.RegionDto;

@Data
public class GetCityDto {
    private int id;
    private String name;
    private RegionDto region;
}
