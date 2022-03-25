package com.greglturnquist.model.question;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class MultipleChoiceQuestion extends Question {

    @ElementCollection
    private Set<String> questionOptions;
    private QuestionType type;

    public MultipleChoiceQuestion(String question){
        super(question);
        this.questionOptions = new HashSet<>();
        this.type = QuestionType.MULTIPLE_CHOICE;
    }

    public MultipleChoiceQuestion() {
        super();
        this.type = QuestionType.MULTIPLE_CHOICE;
    }

    public Set<String> getQuestionOptions(){
        return questionOptions;
    }


    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public boolean addQuestionOption(String option) {
        return questionOptions.add(option);
    }

    public boolean removeQuestionOption(String option) {
        return questionOptions.remove(option);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MultipleChoiceQuestion multipleChoiceQuestion = (MultipleChoiceQuestion) o;
        return Objects.equals(questionOptions, multipleChoiceQuestion.getQuestionOptions()) && Objects.equals(type, multipleChoiceQuestion.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionOptions);
    }
}