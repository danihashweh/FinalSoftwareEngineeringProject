package com.greglturnquist.controller;

import com.greglturnquist.model.Answer;
import com.greglturnquist.model.form.Form;
import com.greglturnquist.model.question.Question;
import com.greglturnquist.repository.FormRepository;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class RepositoryController {

    private final FormRepository repository;

    public RepositoryController(FormRepository repository) {
        this.repository = repository;
    }


    /**
     * Creates a form
     * @param requestBody
     * @return
     */
    @PostMapping(value = "/createForm", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createForm(@RequestBody String requestBody){
        Form form = new Form();
        return ResponseEntity.status(HttpStatus.CREATED).body("HTTP Status will be CREATED (CODE 201)\n");
    }

    /**
     * Submission of form
     * @param formId
     * @param requestBody
     * @return
     */
    @PostMapping(value = "/submitForm/{formId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitForm(@PathVariable UUID formId,@RequestBody String requestBody){
        Optional<Form> form = repository.findById(formId);
        List<Question> questionList = form.get().getQuestions();
        for (Question question : questionList){
            Answer answer = new Answer();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("HTTP Status will be CREATED (CODE 201)\n");
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

}
