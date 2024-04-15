package com.example.agile.repositories;

import com.example.agile.objecs.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoTest extends JpaRepository<Test,Long> {

}
