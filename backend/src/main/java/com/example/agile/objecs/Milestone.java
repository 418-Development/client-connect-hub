package com.example.agile.objecs;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Entity
@Table(name = "milestones")
public class Milestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long milestoneId;

    @Setter
    @NotBlank
    @Size(max = 50)
    private String milestoneName;

    @Setter
    @Size(max = 1500)
    private String description;

    @Setter
    @NotNull
    private Long creatorId;

    @Setter
    private Date createdDate;

    @Setter
    private Date estimateDate;

    @Setter
    private Long projectId;

    @Setter
    private Boolean isDone;

    public Milestone(String name, String description, Long creatorId, Date estimateDate, Boolean status) {
        setMilestoneName(name);
        setDescription(description);
        setCreatorId(creatorId);
        setCreatedDate(Date.from(Instant.now()));
        setEstimateDate(estimateDate);
        setIsDone(status != null ? status : false);
    }
    public Milestone(){}

    public Long getCreatorId() {
        return creatorId;
    }

    public String getDescription() {
        return description;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public Long getMilestoneId() {
        return milestoneId;
    }

    public Date getEstimateDate() {
        return estimateDate;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public boolean getIsDone() {
        return isDone;
    }

}
