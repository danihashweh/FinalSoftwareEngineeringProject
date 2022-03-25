package com.greglturnquist.model.question;

import javax.persistence.Entity;

@Entity
public class NumberRangeQuestion extends Question {

    private int minValue;
    private int maxValue;
    private QuestionType type;

    public NumberRangeQuestion(String question, int minValue, int maxValue) {
        super(question);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.type = QuestionType.NUMBER_RANGE;
    }

    public NumberRangeQuestion() {
        super();
        this.type = QuestionType.NUMBER_RANGE;
    }

    public int getMinValue() {
        return minValue;
    }

    public int getMaxValue() {
        return maxValue;
    }

    public void setMinValue(int minValue) {
        this.minValue = minValue;
    }

    public void setMaxValue(int maxValue) {
        this.maxValue = maxValue;
    }

    public QuestionType getType(){
        return type;
    }
    public void setType(QuestionType type){
        this.type = type;
    }
    @Override
    public String toString() {
        return "Number Range Question{" + "min= " + minValue + ", max=" + maxValue + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        NumberRangeQuestion numberRangeQuestion = (NumberRangeQuestion) o;
        return maxValue == numberRangeQuestion.getMaxValue() && minValue == numberRangeQuestion.getMinValue();
    }

}
