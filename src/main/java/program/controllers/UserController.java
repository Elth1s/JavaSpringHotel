package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import program.dtos.regions.GetRegionDto;
import program.dtos.regions.RegionDto;
import program.entities.Region;
import program.entities.User;
import program.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Tag(name = "User")
@RestController
@RequestMapping(path = "api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/get-all")
    public Page<User> getAll(int page) {
        Sort sort = Sort.by("Id");

        Pageable pageable = PageRequest.of(page, 20, sort);
        Page<User> list = userRepository.findAll(pageable);
        return list;
    }

}
