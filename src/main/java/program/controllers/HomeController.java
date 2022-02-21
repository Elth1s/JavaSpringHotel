package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dtos.homes.UploadImageDto;
import program.dtos.regions.GetRegionDto;
import program.dtos.regions.RegionDto;
import program.entities.HotelImage;
import program.entities.Region;
import program.mapper.RegionMapper;
import program.repositories.HotelImageRepository;
import program.repositories.RegionRepository;
import program.storage.FileSystemStorageService;
import program.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final StorageService storageService;
    private final HotelImageRepository hotelImageRepository;

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {

        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode("сало.jpg", StandardCharsets.UTF_8.toString());
        return ResponseEntity.ok()
                //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + urlFileName + "\"")
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto dto) {
        String fileName = storageService.save(dto.getBase64());
        HotelImage hotelImage = new HotelImage(fileName);
        hotelImageRepository.save(hotelImage);
        return fileName;
    }
}
