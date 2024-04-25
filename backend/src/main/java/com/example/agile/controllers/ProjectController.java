package com.example.agile.controllers;


import com.example.agile.objecs.*;
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

import java.util.*;

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
            logger.info(savedProject.getProjectId().toString());
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to create project: " + e.getMessage()));
        }
    }


    @DeleteMapping("/delete-project/{projectId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
            }

            // Fetch the project
            Project project = projectRepository.findById(projectId).orElse(null);
            if (project == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
            }

            // Check if the user has the necessary role to delete projects
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
            }
            if (!currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("User does not have permission to delete projects"));
            }

            // Delete the project
            projectRepository.delete(project);

            return ResponseEntity.ok(new MessageResponse("Project deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to delete project: " + e.getMessage()));
        }
    }

    @PutMapping("/update-project/{projectId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProject(@PathVariable Long projectId, @Valid @RequestBody Project projectDetails) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
            }

            // Fetch the project
            Project project = projectRepository.findById(projectId).orElse(null);
            if (project == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
            }

            // Check if the user has the necessary role to update projects
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
            }
            if (!currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("User does not have permission to update projects"));
            }

            // Update project details
            project.setProjectName(projectDetails.getProjectName());
            project.setDescription(projectDetails.getDescription());
            // You can add more fields to update as needed

            // Save the updated project
            Project updatedProject = projectRepository.save(project);

            return ResponseEntity.ok(new MessageResponse("Project updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to update project: " + e.getMessage()));
        }
    }

    @PostMapping("/{projectId}/update-clients")
    public ResponseEntity<?> addClientToProject(@PathVariable Long projectId, @RequestBody Map<String, List<Long>> requestBody) {
        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
            }

            // Fetch the project
            Project project = projectRepository.findById(projectId).orElse(null);
            if (project == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
            }

            // Check if the user has the necessary role to update projects
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
            }
            if (!currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("User does not have permission to update projects"));
            }
            // Save the updated project
            Project updatedProject = projectRepository.save(project);
            return ResponseEntity.ok(new MessageResponse("Client added to project successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to add client to project: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProjects() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
        }

        if(currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_ADMIN || role.getName() == ERole.ROLE_MODERATOR)){
            return ResponseEntity.ok(projectRepository.findAll());
        }

        return ResponseEntity.ok(currentUser.getProjects());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            return ResponseEntity.ok(project.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{projectId}/addUser/{userId}")
    public ResponseEntity<?> addUserToProject(@PathVariable Long projectId, @PathVariable Long userId) {
        // Fetch project from the database
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
        }
        // Fetch user from the database
        User user = userRepository.findById(userId).orElse(null);
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }
        // Add user to the project
        project.getUsers().add(user);
        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{projectId}/removeUser/{userId}")
    public ResponseEntity<?> removeUserFromProject(@PathVariable Long projectId, @PathVariable Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }

        if (!project.getUsers().contains(user)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("User is not associated with this project"));
        }

        project.getUsers().remove(user);
        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }

    @GetMapping("/get_projects_by_user/{user_id}")
    public ResponseEntity<?> getProjectsByCurrentUser(@PathVariable Long user_id) {
            User user = userRepository.findById(user_id).orElse(null);
            if (user == null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
            }

            return ResponseEntity.ok(user);
    }


}
