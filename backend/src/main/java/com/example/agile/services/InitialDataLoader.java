package com.example.agile.services;


import com.example.agile.controllers.UserController;
import com.example.agile.objecs.ERole;
import com.example.agile.objecs.Role;
import com.example.agile.objecs.User;
import com.example.agile.repositories.RoleRepo;
import com.example.agile.repositories.UserRepo;
import org.hibernate.cfg.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class InitialDataLoader implements CommandLineRunner {
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private RoleRepo roleRepository;
    @Autowired
    PasswordEncoder encoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = new User(
                    "Admin",
                    "418devlopment@gmail.com",
                    encoder.encode("418Development")
            );

            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName(ERole.ROLE_MANAGER).orElseThrow(
                    () -> new RuntimeException("Error: Role is not found.")
            );
            roles.add(userRole);
            user.setRoles(roles);

            logger.info("ADD initial admin user!");
            userRepository.save(user);
        }
    }
}