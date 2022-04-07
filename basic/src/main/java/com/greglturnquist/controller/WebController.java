package com.greglturnquist.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.greglturnquist.model.Answer;
import com.greglturnquist.model.form.Form;
import com.greglturnquist.model.question.Question;
import com.greglturnquist.repository.FormRepository;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class WebController {

    private final FormRepository repository;

    public WebController(FormRepository repository) {
        this.repository = repository;
    }

    public static String decodeValue(String value) {
        try {
            return URLDecoder.decode(value, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException ex) {
            throw new RuntimeException(ex.getCause());
        }
    }

    @PostMapping("/form")
    public Form createForm(@RequestBody(required = false) List<Question> questionList) {
        Form a = new Form();
        if(questionList != null) {
            for(Question b : questionList) {
                a.addQuestion(b);
            }
        }
        repository.save(a);

        return a;
    }

    @GetMapping("/form/{id}")
    public Form getForm(@PathVariable String id) {
        Optional<Form> response = repository.findById(UUID.fromString(id));
        return response.orElse(null);
    }

    @GetMapping("/form")
    public Form getAllForms() {
        Iterable<Form> response = repository.findAll();
        List<Form> temp = new ArrayList<Form>();
        for (Form f : response) {
            temp.add(f);
        }
        //returning first index just for the first milestone
        return temp.get(0);
    }

    @PostMapping("/form/{id}")
    public PrimitiveResponse<Boolean> createQuestion(@PathVariable String id, @RequestBody Question question) {
        Optional<Form> response = repository.findById(UUID.fromString(id));
        if(response.isEmpty()) {
            return new PrimitiveResponse<>("success", false);
        }
        Form book = response.get();
        book.addQuestion(question);
        repository.save(book);
        return new PrimitiveResponse<>("success", true);
    }

    @DeleteMapping("/form/{id}/question/{questionId}")
    public PrimitiveResponse<Boolean> deleteQuestion(@PathVariable String id, @PathVariable String questionId) {
        Optional<Form> response = repository.findById(UUID.fromString(id));
        if(response.isEmpty()) {
            return new PrimitiveResponse<>("success", false);
        }
        Form book = response.get();
        if(book.removeQuestion(UUID.fromString(questionId))) {
            repository.save(book);
            return new PrimitiveResponse<>("success", true);
        }
        return new PrimitiveResponse<>("success", false);
    }

    @PostMapping(value = "/submission")
    public PrimitiveResponse<Boolean> submitForm(@RequestBody String body) throws JsonProcessingException {
        System.out.println(body);
        String decodedValue = decodeValue(body);
        decodedValue = decodedValue.substring(0, decodedValue.length() - 1);
        System.out.println(decodedValue);
        List<String> answerList = Arrays.asList(decodedValue.split(","));
        for(String s : answerList){
            System.out.println(s);
        }
        System.out.println(answerList);
        Iterable<Form> response = repository.findAll();
        List<Form> temp = new ArrayList<Form>();
        for (Form f : response) {
            temp.add(f);
        }
        Form f = temp.get(0);
//

        List<Question> questionList = f.getQuestions();
//        for(Question q: questionList){
//            System.out.println(q);
//            Answer answer = new Answer("hey");
//            q.addAnswerList(answer);
//            answer.setQuestion(q);
//        }
        for(int i = 0; i < questionList.size(); i++){
            Answer answer = new Answer(answerList.get(i));
            questionList.get(i).addAnswerList(answer);
            answer.setQuestion(questionList.get(i));
        }
        repository.save(f);
        return new PrimitiveResponse<>("success", false);
    }

}


class PrimitiveResponse<T> {

    private final Map<String, T> body;

    public PrimitiveResponse(String key, T value) {
        this.body = new HashMap<>(1);
        this.body.put(key, value);
    }

    public Map<String, T> getBody() {
        return this.body;
    }
}