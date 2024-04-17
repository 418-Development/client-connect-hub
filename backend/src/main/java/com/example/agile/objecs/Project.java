package com.example.agile.objecs;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String projectName;

    @Size(max = 150)
    private String description;

    private Long creatorId;

    @ElementCollection
    private List<Long> clients;

    @ElementCollection
    private List<Long> assignMembers;

    private Date startDate;

    private Date estimateDate;

    @ElementCollection
    private List<Long> milestones;


    public Project(String projectName){
        this.projectName = projectName;
    }
    public Project(){

    }

}
