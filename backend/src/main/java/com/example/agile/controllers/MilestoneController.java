package com.example.agile.controllers;


import com.example.agile.objecs.ERole;
import com.example.agile.objecs.Milestone;
import com.example.agile.objecs.Project;
import com.example.agile.objecs.User;
import com.example.agile.payload.response.MessageResponse;
import com.example.agile.repositories.MilestoneRepo;
import com.example.agile.repositories.ProjectRepo;
import com.example.agile.repositories.RoleRepo;
import com.example.agile.repositories.UserRepo;
import com.example.agile.security.JwtUtils;
import jakarta.validation.Valid;
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

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/milestones")
public class MilestoneController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    ProjectRepo projectRepository;

    @Autowired
    MilestoneRepo milestoneRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/{project_id}/create-milestone")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createMilestone(@PathVariable Long project_id,@Valid @RequestBody Milestone milestone) {
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
            Project project = projectRepository.findById(project_id).orElse(null);
            if (project == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project Not Available"));
            }
            milestone.setProjectId(project_id);
            milestone.setCreatorId(currentUser.getId());

            Milestone savedMilestone = milestoneRepo.save(milestone);
            project.getMilestones().add(milestone);
            projectRepository.save(project);
            return ResponseEntity.ok(new MessageResponse("Milestone created successfully with id: " + savedMilestone.getMilestoneId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to create project: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllMilestones() {
        List<Milestone> milestones = milestoneRepo.findAll();
        return ResponseEntity.ok(milestones);
    }
    @GetMapping("/get-by-project/{project_id}")
    public ResponseEntity<?> getMilestoneByProjectId(@PathVariable Long project_id) {
        List<Milestone> milestones = milestoneRepo.findByProjectId(project_id);
        if (!milestones.isEmpty()) {
            return ResponseEntity.ok(milestones);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMilestoneById(@PathVariable Long id) {
        Optional<Milestone> milestone = milestoneRepo.findById(id);
        if (milestone.isPresent()) {
            return ResponseEntity.ok(milestone.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-milestone/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateMilestone(@PathVariable Long id, @Valid @RequestBody Milestone milestoneDetails) {

        Optional<Milestone> optionalMilestone = milestoneRepo.findById(id);
        if (optionalMilestone.isPresent()) {
            Milestone milestone = optionalMilestone.get();
            // Update milestone details
            milestone.setMilestoneName(milestoneDetails.getMilestoneName());
            milestone.setDescription(milestoneDetails.getDescription());
            milestone.setEstimateDate(milestoneDetails.getEstimateDate());
            // Save updated milestone
            Milestone updatedMilestone = milestoneRepo.save(milestone);
            return ResponseEntity.ok(updatedMilestone);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete-milestone/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteMilestone(@PathVariable Long id) {
        Optional<Milestone> optionalMilestone = milestoneRepo.findById(id);
        if (optionalMilestone.isPresent()) {
            milestoneRepo.deleteById(id);
            return ResponseEntity.ok("Milestone deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/milestone-status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateMilestoneStatus(@PathVariable Long id, @RequestBody Boolean isComplete) {
        Optional<Milestone> optionalMilestone = milestoneRepo.findById(id);
        if (optionalMilestone.isPresent()) {
            Milestone milestone = optionalMilestone.get();
            milestone.setIsDone(isComplete);
            milestoneRepo.save(milestone);
            return ResponseEntity.ok(isComplete ? "Milestone marked as 'Complete'." : "Milestone status marked as 'In-Progress'");
        } else {
            return ResponseEntity.notFound().build();
        }
    }    
    
}
