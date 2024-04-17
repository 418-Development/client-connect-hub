package com.example.agile.controllers;


import com.example.agile.objecs.ERole;
import com.example.agile.objecs.Project;
import com.example.agile.objecs.Role;
import com.example.agile.objecs.User;
import com.example.agile.payload.request.SignupRequest;
import com.example.agile.payload.response.MessageResponse;
import com.example.agile.repositories.ProjectRepo;
import com.example.agile.repositories.RoleRepo;
import com.example.agile.repositories.UserRepo;
import com.example.agile.security.JwtUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    ProjectRepo projectRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/create-project")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
            }

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
            }

            // Check if the user has the necessary role to create projects
            if (!currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("User does not have permission to create projects"));
            }
            project.setCreatorId(currentUser.getId());
            // Save the project
            Project savedProject = projectRepository.save(project);
            return ResponseEntity.ok(new MessageResponse("Project created successfully with id: " + savedProject.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to create project: " + e.getMessage()));
        }
    }

}
