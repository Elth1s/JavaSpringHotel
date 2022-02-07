package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import program.dtos.regions.AddRegionDto;
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

    @GetMapping("/")
    public List<Region> index() {
        List<Region> regions = regionRepository.findAll();
        return regions;
    }

    @PostMapping("/create")
    public Region create(AddRegionDto dto) {
        Region newRegion = regionMapper.AddRegionToRegion(dto);
        regionRepository.save(newRegion);
        return newRegion;
    }

    @PutMapping("/update/{id}")
    public Region update(@PathVariable("id") int id, AddRegionDto dto) {
        Optional<Region> region = regionRepository.findById(id);

        if (region.isPresent()) {
            region.get().setName(dto.getName());
            regionRepository.save(region.get());
            return region.get();
        }
        return null;
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
