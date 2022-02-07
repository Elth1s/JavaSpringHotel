package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dtos.regions.AddRegionDto;
import program.entities.Region;


@Mapper(componentModel = "spring")
public interface RegionMapper {
    @Mapping(source = "name", target = "name")
    Region AddRegionToRegion(AddRegionDto addRegionDto);

}
