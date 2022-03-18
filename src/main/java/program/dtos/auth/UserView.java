package program.dtos.auth;

import lombok.Data;

@Data
public class UserView {
    private Long id;
    private String username;
    private String fullname;
}
