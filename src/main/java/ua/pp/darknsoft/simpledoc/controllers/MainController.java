package ua.pp.darknsoft.simpledoc.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    public ClassPathResource homePage() {
        return new ClassPathResource("build/index.html");
    }
}
