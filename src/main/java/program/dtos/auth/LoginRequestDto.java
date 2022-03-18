package program.dtos.auth;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class LoginRequestDto {

    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;

}
