package com.example.agile.objecs;

import jakarta.persistence.*;

@Entity
@Table(name = "labels")
public class Label {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ELabel name;

    public Label() {}

    public Label(ELabel name) {
        this.name = name;
    }

    public ELabel getName() {
        return name;
    }

    public void setName(ELabel name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }
}
