package com.example.agile.repositories;

import com.example.agile.objecs.Milestone;
import com.example.agile.objecs.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByForumId(Long forumId);

}
