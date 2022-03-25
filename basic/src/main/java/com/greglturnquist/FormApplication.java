package com.greglturnquist;

import com.greglturnquist.model.form.Form;
import com.greglturnquist.model.question.NumberRangeQuestion;
import com.greglturnquist.model.question.MultipleChoiceQuestion;
import com.greglturnquist.model.question.Question;
import com.greglturnquist.model.question.TextQuestion;
import com.greglturnquist.repository.FormRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FormApplication {

    private static final Logger log = LoggerFactory.getLogger(FormApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(FormApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(FormRepository repository) {
        return (args) -> {
            Form form = new Form();

            form.addQuestion(new NumberRangeQuestion("How much do you like soccer?", 1, 5));
            form.addQuestion(new TextQuestion("What colour do you like?"));
            form.addQuestion(new TextQuestion("what day is it?"));
            form.addQuestion(new TextQuestion("Do you enjoy the day?"));

            MultipleChoiceQuestion mcq = new MultipleChoiceQuestion("What season do you like?");
            mcq.addQuestionOption("Winter");
            mcq.addQuestionOption("Spring");
            mcq.addQuestionOption("Summer");
            mcq.addQuestionOption("Fall");
            form.addQuestion(mcq);


            repository.save(form);

            log.info("Created new Form");


            for (Form f : repository.findAll()) {
                log.info(f.getId().toString());
                log.info(f.toString());
            }
        };
    }
}