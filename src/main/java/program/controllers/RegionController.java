package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import program.dtos.regions.GetRegionDto;
import program.dtos.regions.RegionDto;
import program.entities.Region;
import program.mapper.RegionMapper;
import program.repositories.RegionRepository;

import java.util.List;
import java.util.Optional;

@Tag(name = "Region")
@RestController
@RequestMapping(path = "api/region")
@RequiredArgsConstructor
public class RegionController {
    private final RegionRepository regionRepository;
    private final RegionMapper regionMapper;

    @GetMapping("/get-all")
    public List<GetRegionDto> getAll() {
        List<GetRegionDto> regions = regionMapper.RegionListToGetRegionDtoList(regionRepository.findAll());
        return regions;
    }

    @PostMapping("/create")
    public Region create(RegionDto dto) {
        Region newRegion = regionMapper.RegionDtoToRegion(dto);
        regionRepository.save(newRegion);
        return newRegion;
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable("id") int id, RegionDto dto) {
        Optional<Region> region = regionRepository.findById(id);

        if (region.isPresent()) {
            region.get().setName(dto.getName());
            regionRepository.save(region.get());
            return "Region updated.";
        }
        return "Id not found";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") int id) {
        Optional<Region> region = regionRepository.findById(id);

        if (region.isPresent()) {
            regionRepository.delete(region.get());
            return "Deleted";
        }
        return "Id not found";
    }
}
