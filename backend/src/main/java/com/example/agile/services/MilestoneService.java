package com.example.agile.services;

import com.example.agile.objecs.Milestone;
import com.example.agile.repositories.MilestoneRepo;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class MilestoneService {

    @Autowired
    private MilestoneRepo milestoneRepository;

    public Milestone updateMilestoneStatus(Long milestoneId) {
        Optional<Milestone> optionalMilestone = milestoneRepository.findById(milestoneId);
        
        if (optionalMilestone.isPresent()) {
            Milestone milestone = optionalMilestone.get();
            
            // Check if milestone is already complete
            if (milestone.getIsComplete()) {
                throw new IllegalArgumentException("Milestone is already complete.");
            }
            
            // Mark the milestone as complete
            milestone.setIsComplete(true);
            
            // Save the updated milestone
            return milestoneRepository.save(milestone);
            
        } else {
            throw new IllegalArgumentException("Milestone not found.");
        }
    }
}
