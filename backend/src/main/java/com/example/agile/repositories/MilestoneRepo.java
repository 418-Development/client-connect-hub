package com.example.agile.repositories;

import com.example.agile.objecs.Milestone;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public interface MilestoneRepo extends JpaRepository<Milestone,Long> {
    @Override
    Optional<Milestone> findById(Long aLong);

    List<Milestone> findByProjectId(Long projectId);
}
