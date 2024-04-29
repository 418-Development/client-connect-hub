package com.example.agile.repositories;

import com.example.agile.objecs.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForumRepo extends JpaRepository<Forum, Long> {
    @Override
    Optional<Forum> findById(Long aLong);
}
