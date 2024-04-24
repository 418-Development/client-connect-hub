package com.example.agile.repositories;

import com.example.agile.objecs.ELabel;
import com.example.agile.objecs.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LabelRepo extends JpaRepository<Label, Integer> {
    Optional<Label> findByName(ELabel name);
}
