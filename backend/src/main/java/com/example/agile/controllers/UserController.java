package com.example.agile.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.agile.objecs.ERole;
import com.example.agile.objecs.Role;
import com.example.agile.objecs.User;
import com.example.agile.payload.request.LoginRequest;
import com.example.agile.payload.request.SignupRequest;
import com.example.agile.payload.response.JwtResponse;
import com.example.agile.payload.response.MessageResponse;
import com.example.agile.repositories.RoleRepo;
import com.example.agile.repositories.UserRepo;
import com.example.agile.security.AuthEntryPointJwt;
import com.example.agile.security.JwtUtils;
import com.example.agile.security.UserDetailsImpl;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("/auth/signin");

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info("/auth/signup");

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    //Bmi calculation api
    @PostMapping("/test/calculate_bmi")
    public ResponseEntity<MessageResponse> calculateBmi(@RequestBody User user) {
        logger.info("/test/calculate_bmi");


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = "";

        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            username = userDetails.getUsername();
            logger.info("username: " + username);
        }

        Optional<User> userSelect = userRepository.findByUsername(username);
        if (userSelect.isPresent()) {
            userSelect.get().setAge(user.getAge());
            userSelect.get().setHeight(user.getHeight());
            userSelect.get().setWeight(user.getWeight());
            double calculatedResult = calculateBMI(user.getWeight(), user.getHeight());
            userRepository.save(userSelect.get());
            String temp = calculatedResult < 18.5 ? "You are underweight." :
                    calculatedResult < 25 ? "You have a normal weight." :
                            calculatedResult < 30 ? "You are overweight." :
                                    "You are obese.";
            return ResponseEntity.ok(new MessageResponse(calculatedResult + ""));
        }
        return null;
    }

    @GetMapping("/test/userinfo")
    public ResponseEntity<User> getUserinfo() {
        logger.info("/test/userinfo");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = "";

        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            username = userDetails.getUsername();
            logger.info("username: " + username);
        }

        Optional<User> userSelect = userRepository.findByUsername(username);
        if (userSelect.isPresent()) {
            User user = userSelect.get();
            user.setPassword("");
            return ResponseEntity.ok(user);
        }
        return null;
    }

    public static double calculateBMI(double weight, double height) {
        // Convert height from centimeters to meters
        double heightInMeters = height / 100.0;

        // Calculate BMI
        double bmi = weight / (heightInMeters * heightInMeters);

        return bmi;
    }

}
