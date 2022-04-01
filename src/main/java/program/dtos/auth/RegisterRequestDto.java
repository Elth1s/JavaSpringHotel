package program.dtos.auth;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class RegisterRequestDto {
    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;
    private String fullName;
    private String reCaptchaToken;
}
