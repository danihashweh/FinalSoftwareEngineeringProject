package com.greglturnquist.model;
import javax.persistence.*;

@Entity
public class Admin {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private static final String password = "MASTER-PASSWORD";

    public Admin(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}