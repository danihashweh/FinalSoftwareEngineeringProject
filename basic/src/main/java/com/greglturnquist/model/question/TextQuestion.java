package com.greglturnquist.model.question;

import com.greglturnquist.model.Answer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.greglturnquist.model.form.Form;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
public class TextQuestion extends Question {
    @Enumerated(EnumType.STRING)
    @Column(name = "QuestionType")
    private QuestionType type;

    public TextQuestion() {
    }

    public TextQuestion(String question) {
        super(question);
        this.type = QuestionType.TEXT;
    }
    public QuestionType getType(){
        return type;
    }
    public void setType(QuestionType type){
        this.type = type;
    }
}