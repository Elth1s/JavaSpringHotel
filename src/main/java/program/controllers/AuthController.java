package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import program.configuration.security.JwtTokenUtil;
import program.dtos.auth.LoginRequestDto;
import program.entities.AppUser;
import program.repositories.CityRepository;
import program.repositories.UserRepository;

@Tag(name = "Auth")
@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/login")
    public ResponseEntity login(LoginRequestDto dto) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            dto.getUsername(),
                            dto.getPassword()));

            User user = (User) authentication.getPrincipal();
            AppUser dbUser = userRepository.findByUsername(user.getUsername());

            String token = jwtTokenUtil.generateAccessToken(dbUser);
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(dbUser.getUsername());
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
