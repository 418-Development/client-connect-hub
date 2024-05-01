package com.example.agile.services;

import com.example.agile.objecs.ELabel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class LabelService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertLabelsIfNotExist() {
        for (ELabel label : ELabel.values()) {
            String labelName = label.name();
            int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM labels WHERE name = ?", Integer.class, labelName);
            if (count == 0) {
                jdbcTemplate.update("INSERT INTO labels (name) VALUES (?)", labelName);
            }
        }
    }
}
