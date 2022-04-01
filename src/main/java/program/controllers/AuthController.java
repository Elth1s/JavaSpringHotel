package program.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.client.RestOperations;
import program.configuration.security.JwtTokenUtil;
import program.configuration.security.captcha.CaptchaSettings;
import program.configuration.security.captcha.GoogleResponse;
import program.constants.Roles;
import program.dtos.auth.LoginRequestDto;
import program.dtos.auth.RegisterRequestDto;
import program.entities.AppUser;
import program.repositories.CityRepository;
import program.repositories.RoleRepository;
import program.repositories.UserRepository;

import javax.validation.Valid;
import java.util.Arrays;

@Tag(name = "Auth")
@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final CaptchaSettings captchaSettings;
    @Autowired
    private final RestOperations restTemplate;
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginRequestDto dto) {
        try {
            String token = loginUser(dto.getUsername(), dto.getPassword());
            return ResponseEntity.ok()
                    .body(token);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequestDto dto) {
        try {
            String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), dto.getReCaptchaToken());
            try {
                final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
                if (!googleResponse.isSuccess()) {
                    throw new Exception("reCaptcha was not successfully validated");
                }
            } catch (Exception rce) {
                String str = rce.getMessage();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            AppUser dbUser = userRepository.findByUsername(dto.getUsername());
            if (dbUser != null) {
                return ResponseEntity.badRequest().body("Email address already in use");
            }

            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            dbUser = new AppUser();
            dbUser.setUsername(dto.getUsername());
            dbUser.setFullName(dto.getFullName());
            dbUser.setPassword(encoder.encode(dto.getPassword()));
            dbUser.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.User)));
            this.userRepository.save(dbUser);

            String token = loginUser(dto.getUsername(), dto.getPassword());
            return ResponseEntity.ok()
                    .body(token);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private String loginUser(String username, String password) throws BadCredentialsException {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        username,
                        password));

        User user = (User) authentication.getPrincipal();
        AppUser dbUser = userRepository.findByUsername(user.getUsername());
        String token = jwtTokenUtil.generateAccessToken(dbUser);
        return token;
    }
}
