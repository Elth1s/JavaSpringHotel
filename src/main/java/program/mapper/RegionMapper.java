package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dtos.regions.GetRegionDto;
import program.dtos.regions.RegionDto;
import program.entities.Region;

import java.util.List;


@Mapper(componentModel = "spring")
public interface RegionMapper {
    @Mapping(source = "name", target = "name")
    Region RegionDtoToRegion(RegionDto regionDto);

    List<GetRegionDto> RegionListToGetRegionDtoList(List<Region> regions);
}
