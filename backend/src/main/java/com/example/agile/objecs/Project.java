package com.example.agile.objecs;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Collection;
import org.springframework.security.core.parameters.P;

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

    @Size(max = 150)
    private String description;

    private Long creatorId;

    private Date createdDate;

    private Date startDate;

    private Date estimateDate;

    @ElementCollection
    private List<Long> milestones;


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
