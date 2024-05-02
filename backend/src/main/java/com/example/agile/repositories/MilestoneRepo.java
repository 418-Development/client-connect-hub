package com.example.agile.repositories;

import com.example.agile.objecs.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MilestoneRepo extends JpaRepository<Milestone,Long> {
    @Override
    Optional<Milestone> findById(Long aLong);

    List<Milestone> findByProjectId(Long projectId);
}
