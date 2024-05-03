package com.example.agile.controllers;

import com.example.agile.objecs.*;
import com.example.agile.payload.response.MessageResponse;
import com.example.agile.repositories.PostRepo;
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
@RequestMapping("/posts")
public class PostController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    ProjectRepo projectRepository;

    @Autowired
    PostRepo postRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @GetMapping("/get-post-by-project/{project_id}")
    public ResponseEntity<?> getMilestoneByProjectId(@PathVariable Long project_id) {

        // Check authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        // Get current user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
        }

        Optional<Project> optionalProject = projectRepository.findById(project_id);
        if (optionalProject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
        }
        Project project = optionalProject.get();
        if (
                currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_MANAGER ||
                        role.getName() == ERole.ROLE_TEAM) ||
                        project.getUsers().stream().anyMatch(user -> Objects.equals(user.getId(), currentUser.getId()))
        ) {
            List<Post> posts = postRepository.findAllByProject(project);
            posts.sort(Comparator.comparing(Post::getPostedDate));
            return ResponseEntity.ok(posts);
        }
        return ResponseEntity.notFound().build();

    }

    @PostMapping("/send-post/{projectId}")
    public ResponseEntity<?> postForumPost(@PathVariable("projectId") Long projectId, @Valid @RequestBody Post post) {
        logger.info("Project id " + projectId);
        logger.info("Body " + post.toString());

        // Check authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        // Get current user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
        }

        // Find project
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Project not found"));
        }
        Project project = optionalProject.get();
        if (
                currentUser.getRoles().stream().anyMatch(role -> role.getName() == ERole.ROLE_MANAGER) ||
                        project.getUsers().stream().anyMatch(user -> Objects.equals(user.getId(), currentUser.getId()))
        ) {
            // Set user and project for the post
            post.setAuthor(currentUser);
            post.setProject(project);

            // Save the post
            Post savedPost = postRepository.save(post);
            project.getPosts().add(savedPost);
            projectRepository.save(project);

            return ResponseEntity.ok(savedPost);
        }
        return ResponseEntity.notFound().build();

    }

    @DeleteMapping("/delete-post/{project_id}/{post_id}")
    public ResponseEntity<?> deletePost(@PathVariable Long project_id, @PathVariable Long post_id) {
        Optional<Post> optionalPost = postRepository.findById(post_id);
        Optional<Project> tempProject = projectRepository.findById(project_id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof UserDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized"));
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("User not found"));
        }
        if (tempProject.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        if (optionalPost.isPresent()) {
            if (optionalPost.get().getAuthor() != currentUser){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Unauthorized delete"));
            }
            Project project = tempProject.get();
            project.getPosts().remove(optionalPost.get());
            projectRepository.save(project);
            postRepository.deleteById(post_id);
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
