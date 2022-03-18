package program.loader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import program.constants.Roles;
import program.entities.AppRole;
import program.entities.AppUser;
import program.repositories.RoleRepository;
import program.repositories.UserRepository;

import java.util.Arrays;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository,
                          RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (this.roleRepository.count() == 0) {
            this.roleRepository.save(new AppRole(Roles.Admin));
            this.roleRepository.save(new AppRole(Roles.User));
        }
        if (this.userRepository.count() == 0) {
            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            AppUser user = new AppUser();
            user.setUsername("dg646726@gmail.com");
            user.setPassword(encoder.encode("111"));
            user.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.Admin)));
            this.userRepository.save(user);
        }
    }
}
