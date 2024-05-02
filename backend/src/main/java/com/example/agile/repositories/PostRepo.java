package com.example.agile.repositories;

import com.example.agile.objecs.Post;
import com.example.agile.objecs.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    @Override
    Optional<Post> findById(Long aLong);

    List<Post> findAllByProject(Project project);
}
