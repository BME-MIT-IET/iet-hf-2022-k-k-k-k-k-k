package com.adja.evchargerappserver.email;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@Api(value = "/email", tags = "EmailSending")
public class EmailSendingController {

    @Autowired
    private EmailSendingService emailSendingService;

    @PostMapping(value = "/sendmail")
    public ResponseEntity<String> sendmail(@RequestBody EmailRequest request) {
        try {
            emailSendingService.sendDefaultEmail(request.getTo(), request.getSubject(), request.getText());

            return new ResponseEntity<>("email sent", HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>("email sending failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
