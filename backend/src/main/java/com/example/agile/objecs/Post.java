package com.example.agile.objecs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Date postedDate;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User author;

    public Post() {
    }

    public Post(String content, Date postedDate) {
        this.content = content;
        this.postedDate = postedDate;
    }

    public Post(Long id, String content, Date postedDate) {
        this.id = id;
        this.content = content;
        this.postedDate = postedDate;
    }

}
