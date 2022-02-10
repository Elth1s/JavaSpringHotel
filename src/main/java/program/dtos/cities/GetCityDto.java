package program.dtos.cities;

import lombok.Data;
import program.dtos.regions.GetRegionDto;

@Data
public class GetCityDto {
    private int id;
    private String name;
    private GetRegionDto region;
}
