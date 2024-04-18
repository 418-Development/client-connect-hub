package com.example.agile.repositories;

import com.example.agile.objecs.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {
    @Override
    Optional<Project> findById(Long aLong);


}
