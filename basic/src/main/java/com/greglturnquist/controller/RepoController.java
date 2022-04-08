package com.greglturnquist.controller;

import com.greglturnquist.model.Answer;
import com.greglturnquist.model.form.Form;
import com.greglturnquist.model.question.*;
import com.greglturnquist.repository.FormRepository;
import net.minidev.json.JSONObject;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
public class RepoController {

    private final FormRepository repository;

    public RepoController(FormRepository repository) {
        this.repository = repository;
    }

    /**
     * This is for parsing the array
     * @param value
     * @return
     */
    public static String decodeValue(String value) {
        try {
            return URLDecoder.decode(value, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException ex) {
            throw new RuntimeException(ex.getCause());
        }
    }

    /**
     * Creates a form
     * @param responseROS
     * @return
     */
    @PostMapping(value = "/createForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createForm(@RequestBody List<ResponseRO> responseROS){
        Form form = new Form();
        for(ResponseRO responseRO : responseROS){
            if (responseRO.getType().equalsIgnoreCase(QuestionType.TEXT.name())){
                Question question = new TextQuestion(responseRO.getValue());
                form.addQuestion(question);
            }else if(responseRO.getType().equalsIgnoreCase(QuestionType.NUMBER_RANGE.name())){
                Question question = new NumberRangeQuestion(responseRO.getValue(), responseRO.getMinValue(), responseRO.getMaxValue());
                form.addQuestion(question);

            }else if(responseRO.getType().equalsIgnoreCase(QuestionType.MULTIPLE_CHOICE.name())){
                MultipleChoiceQuestion question = new MultipleChoiceQuestion(responseRO.getValue());
                for (String possibleAnswers: responseRO.getAnswers()){
                    question.addQuestionOption(possibleAnswers);
                }
                form.addQuestion(question);
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("bad form\n");
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Form has been created\n");
    }

    /**
     * Submission of form
     * @param formId
     * @param requestBody
     * @return
     */
    @PostMapping(value = "/submitForm/{formId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitForm(@PathVariable UUID formId, @RequestBody String requestBody){
        Optional<Form> form = repository.findById(formId);
        List<Question> questionList = form.get().getQuestions();
        //parse for the answer
        String decodedValue = decodeValue(requestBody);
        decodedValue = decodedValue.substring(0, decodedValue.length() - 1);
        System.out.println(decodedValue);
        List<String> answerList = Arrays.asList(decodedValue.split(","));
        // set the answer to the question
        for(int i = 0; i < questionList.size(); i++){
            Answer answer = new Answer(answerList.get(i));
            questionList.get(i).addAnswerList(answer);
            answer.setQuestion(questionList.get(i));
        }
        return ResponseEntity.status(HttpStatus.OK).body("Submission was successful\n");
    }

    /**
     *
     * @return json body of all UUIDs
     */
    @GetMapping(value = "/getAllForms")
    public ResponseEntity<?> getAllForms(){
        Iterable<Form> allForms = repository.findAll();
        List<UUID> formIds = new ArrayList<>();
        for (Form form : allForms){
            formIds.add(form.getId());
        }
        //make a check if the form id is empty
        return ResponseEntity.status(HttpStatus.OK).body(formIds);
    }

    /**
     * Close the form
     * @param formId
     * @return
     */
    @GetMapping(value = "/closeForm/{formId}")
    public ResponseEntity<?> closeForm(@PathVariable UUID formId){
        Optional<Form> form = repository.findById(formId);
        form.get().closeForm();
        return ResponseEntity.status(HttpStatus.OK).body("Form has been closed\n");
    }

    /**
     * Get the status of the specific form
     * @param formId
     * @return
     */
    @GetMapping(value = "/getFormStatus/{formId}")
    public ResponseEntity<?> getFormStatus(@PathVariable UUID formId){
        Optional<Form> form = repository.findById(formId);
        boolean isOpen = form.get().isFormOpen();
        if (isOpen) return ResponseEntity.status(HttpStatus.OK).body("Open");
        return ResponseEntity.status(HttpStatus.OK).body("Closed");
    }

    /**
     * Close the form
     * @param formId
     * @return
     */
    @GetMapping(value = "/getForm/{formId}")
    public ResponseEntity<?> getForm(@PathVariable UUID formId){
        Optional<Form> form = repository.findById(formId);
        return ResponseEntity.status(HttpStatus.OK).body(form.get());
    }

}
