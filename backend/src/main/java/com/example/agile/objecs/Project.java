package com.example.agile.objecs;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @NotBlank
    @Size(max = 50)
    private String projectName;

    @Size(max = 15000)
    private String description;

    private Long creatorId;

    private Date createdDate;

    private Date startDate;

    private Date estimateDate;

    @ManyToMany
    @JoinTable(
            name = "project_user",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @OneToMany
    @JoinTable(
            name = "project_milestone",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "milestone_id")
    )
    private Set<Milestone> milestones = new HashSet<>();

    public Project(String projectName){
        this.projectName = projectName;
    }
    public Project(String projectName, String description, Long creatorId ){
        setProjectName(projectName);
        setDescription(description);
        setCreatorId(creatorId);
        Date localDate = Date.from(Instant.now());
        setCreatedDate(localDate);
    }

    public Project(){
    }


}
